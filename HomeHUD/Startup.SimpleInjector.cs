using HomeHUD.Models.DbContext;
using HomeHUD.Models.Identity;
using HomeHUD.Services;
using HomeHUD.Services.Jobs;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.AspNetCore.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore.Mvc;
using SimpleInjector.Lifestyles;

namespace HomeHUD
{
    public static class SimpleInjectorStartupExtensions
    {
        public static void AddSimpleInjector(this IServiceCollection services, Container container)
        {
            // Allow injecting HttpContext (for PathProviver)
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton<IControllerActivator>(
                new SimpleInjectorControllerActivator(container));
            services.AddSingleton<IViewComponentActivator>(
                new SimpleInjectorViewComponentActivator(container));

            // Register SignalR Hub creation (to resolve dependencies registered with Simpleinjector)
            var activator = new SimpleInjectorHubActivator(container);
            services.AddScoped<IHubActivator>(_ => new SimpleInjectorHubActivator(container));

            services.EnableSimpleInjectorCrossWiring(container);
            services.UseSimpleInjectorAspNetRequestScoping(container);
        }

        public static void InitializeSimpleInjectorContainer(this IApplicationBuilder app, Container container, IConfigurationRoot configuration)
        {
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
            var hybridLifestyle = Lifestyle.CreateHybrid(
                lifestyleSelector: () => Lifestyle.Scoped.GetCurrentScope(container) != null,
                trueLifestyle: Lifestyle.Scoped,
                falseLifestyle: Lifestyle.Transient);

            container.Register<ApplicationDbContext>(() =>
            {
                var options = new DbContextOptionsBuilder<ApplicationDbContext>();
                options.UseSqlServer(configuration.GetConnectionString("HomeHUD"), x => x.MigrationsAssembly("HomeHUD.Models"));
                return new ApplicationDbContext(options.Options);
            }, hybridLifestyle);

            // Add application presentation components:
            container.RegisterMvcControllers(app);
            container.RegisterMvcViewComponents(app);

            // Add application services. For instance:
            container.RegisterSingleton<IPathProviderContext>(new PathProviderContext(
                app.ApplicationServices.GetRequiredService<IHttpContextAccessor>()));

            container.Register<IEmailSender, AuthMessageSender>();
            container.Register<ISmsSender, AuthMessageSender>();
            container.Register<ILightSwitchService, LightSwitchService>();
            container.Register<ILightSwitchDbService, LightSwitchDbService>();
            container.Register<ILightSwitchTimeService, LightSwitchTimeService>();
            container.Register<IRabbitMqService, RabbitMqService>();
            container.Register<IPathProvider, PathProvider>();
            container.Register<ISunTimeService, SunTimeService>();
            container.Register<ITimeProvider, TimeProvider>();

            // Cross-wire ASP.NET services (if any). For instance:
            container.CrossWire<ILoggerFactory>(app);
            container.CrossWire<IAntiforgery>(app);
            container.CrossWire<UserManager<User>>(app);
            container.CrossWire<SignInManager<User>>(app);
            container.CrossWire<IConnectionManager>(app);

            // Register configration options
            var rabbitMqCredentials = configuration.GetSection($"{nameof(RabbitMq)}:{nameof(RabbitMq.Credentials)}")
                .Get<RabbitMq.Credentials>();
            container.RegisterSingleton(rabbitMqCredentials);

            var rabbitMqQueue = configuration.GetSection($"{nameof(RabbitMq)}:{nameof(RabbitMq.Queue)}")
                .Get<RabbitMq.Queue>();
            container.RegisterSingleton(rabbitMqQueue);

            var antiforgeryOptions = configuration.GetSection("Antiforgery")
                .Get<AntiforgeryOptions>();
            container.RegisterSingleton(antiforgeryOptions);

            var schedulerOptions = configuration.GetSection("Scheduler")
                .Get<LightSwitchScheduler.Options>();
            container.RegisterSingleton(schedulerOptions);
        }
    }
}
