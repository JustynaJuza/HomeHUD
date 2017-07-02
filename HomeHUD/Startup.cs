using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using HomeHUD.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace HomeHUD
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile("appsettings.youShallNotCommitThis.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see https://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var settings = new JsonSerializerSettings();
            settings.ContractResolver = new SignalRContractResolver();

            var serializer = JsonSerializer.Create(settings);
            services.Add(new ServiceDescriptor(typeof(JsonSerializer),
                         provider => serializer,
                         ServiceLifetime.Transient));

            services.AddSignalR();
            services.AddMemoryCache();

            // Allow injecting HttpContext (for PathProviver)
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Map configuration
            services.Configure<RabbitMq.Credentials>(
                Configuration.GetSection($"{nameof(RabbitMq)}:{nameof(RabbitMq.Credentials)}"));
            services.Configure<RabbitMq.Queue>(
                Configuration.GetSection($"{nameof(RabbitMq)}:{nameof(RabbitMq.Queue)}"));

            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("HomeHUD"),
                    x => x.MigrationsAssembly("HomeHUD.Models")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc();

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
            services.AddTransient<ILightSwitchService, LightSwitchService>();
            services.AddTransient<IRabbitMqService, RabbitMqService>();
            services.AddTransient<IPathProvider, PathProvider>();

            // Initialize Automapper
            services.AddAutoMapper();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ApplicationDbContext context)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                if (!string.IsNullOrWhiteSpace(Configuration["showDetailedErrors"]))
                {
                    app.UseDeveloperExceptionPage();
                }
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseIdentity();

            app.UseWebSockets();
            app.UseSignalR();

            // Add external authentication middleware below. To configure them please see https://go.microsoft.com/fwlink/?LinkID=532715

            //app.MapWhen(c => c.Request.Path.Value.eHasValue, b => )

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                //routes.MapRoute(
                //    name: "gaming",
                //    template: "gaming",
                //    defaults: new { controller = "Home", action = "Index" });

                //routes.MapRoute(
                //    name: "bed",
                //    template: "bed",
                //    defaults: new { controller = "Home", action = "Index" });

                //routes.MapRoute(
                //   name: "living",
                //   template: "living",
                //    defaults: new { controller = "Home", action = "Index" });

                //routes.MapSpaFallbackRoute(
                //    name: "spa-fallback",
                //    templatePrefix: "gaming",
                //    defaults: new { controller = "Home", action = "Index" });

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            DbInitializer.Initialize(context);
        }
    }
}
