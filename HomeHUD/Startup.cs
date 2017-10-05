using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using HomeHUD.Models.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using SimpleInjector;
using System.IO;
using System.Linq;

namespace HomeHUD
{
    public class Startup
    {
        private readonly TokenAuthenticationProvider _tokenAuthenticationProvider;
        private readonly Container _container = new Container();

        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile("appsettings.youShallNotCommitThis.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();

            _tokenAuthenticationProvider = new TokenAuthenticationProvider(Configuration);
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppOptions>(Configuration.GetSection(nameof(AppOptions)));

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("HomeHUD"), x => x.MigrationsAssembly("HomeHUD.Models")));

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
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<ApplicationDbContext, int>();

            services.AddAntiforgeryToken(Configuration);

            services.AddAuthorization(options =>
            {
                //options.AddPolicy(, policy => policy.RequireClaim());
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
            services.AddSignalRFramework();

            services.AddSimpleInjector(_container);

            services.AddAutoMapper();

            services.AddAntiforgeryToken(Configuration);
        }

        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env,
            IApplicationLifetime lifetime,
            ILoggerFactory loggerFactory,
            ApplicationDbContext context)
        {
            app.InitializeSimpleInjectorContainer(_container, Configuration);
            _container.Verify();

            app.AddLogging(loggerFactory, Configuration);
            app.AddApplicationLifetimeEvents(lifetime);

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
                if (!string.IsNullOrWhiteSpace(Configuration[$"{nameof(AppOptions)}:{nameof(AppOptions.ShowDetailedErrors)}"]))
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
            app.UseValidateAntiforgeryToken();

            // SignalR
            app.UseWebSockets();
            app.UseSignalR();

            app.UseFluentScheduler(_container);

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
