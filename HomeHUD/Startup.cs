using HomeHUD.Models.DbContext;
using HomeHUD.Models.Identity;
using HomeHUD.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using System.IO;
using System.Linq;

namespace HomeHUD
{
    public class Startup
    {
        private readonly TokenAuthenticationProvider _tokenAuthenticationProvider;

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

            _tokenAuthenticationProvider = new TokenAuthenticationProvider(Configuration);
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //var settings = new JsonSerializerSettings();
            //settings.ContractResolver = new SignalRContractResolver();

            //var serializer = JsonSerializer.Create(settings);
            //services.Add(new ServiceDescriptor(typeof(JsonSerializer),
            //             provider => serializer,
            //             ServiceLifetime.Transient));

            services.AddSignalR();
            services.AddMemoryCache();

            // Allow injecting HttpContext (for PathProviver)
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Map configuration
            services.Configure<RabbitMq.Credentials>(
                Configuration.GetSection($"{nameof(RabbitMq)}:{nameof(RabbitMq.Credentials)}"));
            services.Configure<RabbitMq.Queue>(
                Configuration.GetSection($"{nameof(RabbitMq)}:{nameof(RabbitMq.Queue)}"));
            services.Configure<AntiforgeryOptions>(
                Configuration.GetSection("AntiForgery"));

            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("HomeHUD"), x => x.MigrationsAssembly("HomeHUD.Models")));


            //services.Configure<TokenProviderOptions>(options =>
            //    _tokenAuthenticationProvider.SetTokenProviderOptions(options));

            services
                .AddIdentity<User, Role>(options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 6;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;

                    options.Cookies.ApplicationCookie = _tokenAuthenticationProvider.CookieAuthenticationOptions;
                })
                .AddClaimsPrincipalFactory<ApplicationClaimsPrincipalFactory>()
                .AddUserStore<ApplicationUserStore>()
                .AddRoleStore<ApplicationRoleStore>()
                .AddDefaultTokenProviders();

            services.AddAntiforgery(options =>
            {
                var antiforgeryOptions = new AntiforgeryOptions();
                Configuration.GetSection("AntiForgery").Bind(antiforgeryOptions);

                options.CookieName = antiforgeryOptions.CookieName;
                options.HeaderName = antiforgeryOptions.HeaderName;
                options.FormFieldName = antiforgeryOptions.HeaderName;
            });

            services
                .AddMvc(options =>
                {
                    //options.Filters.Add(new RequireHttpsAttribute());
                })
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
            services.AddTransient<ILightSwitchService, LightSwitchService>();
            services.AddTransient<IRabbitMqService, RabbitMqService>();
            services.AddTransient<IPathProvider, PathProvider>();
            //services.AddTransient<ITokenProvider, TokenProvider>();

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

            // Authentication settings
            app.UseCookieAuthentication(_tokenAuthenticationProvider.CookieAuthenticationOptions);
            app.UseJwtBearerAuthentication(_tokenAuthenticationProvider.JwtBearerOptions);
            app.UseIdentity();
            app.UseValidateAntiForgeryToken();

            // SignalR
            app.UseWebSockets();
            app.UseSignalR();

            app.UseStatusCodePages();

            app.UseMvc(routes =>
                {
                    routes.MapRoute(
                        name: "default",
                        template: "{controller=Home}/{action=Index}/{id?}");
                });

            app.MapWhen(
                httpContext =>
                    !new[] { 400, 401, 402, 403 }.Contains(httpContext.Response.StatusCode) // is not permission error
                    && !(httpContext.Response.StatusCode == 404 && Path.HasExtension(httpContext.Request.Path.Value)), // is not failed file request
                appBuilder =>
                {
                    // then try spa fallback
                    appBuilder.UseMvc(routes =>
                    {
                        routes.MapSpaFallbackRoute(
                            name: "spa-fallback",
                            defaults: new { controller = "Home", action = "Index" });
                    });
                });

            //app.MapWhen(httpContext => httpContext.Response.StatusCode == 404
            //    && Path.HasExtension(httpContext.Request.Path.Value),
            //        appBuilder =>
            //        {
            //            appBuilder.Use((context, next) =>
            //            {
            //                context.Request.Path = new PathString("/index.html");
            //                Console.WriteLine("Path changed to:" + context.Request.Path.Value);
            //                return next();
            //            });

            //            branch.UseStaticFiles();
            //        });

            //app.MapWhen(x => !x.Request.Path.Value.StartsWith("/api"),
            //app.MapWhen(c => c.Request.Path.Value.eHasValue, b => )


            DbInitializer.Initialize(context);
        }
    }
}
