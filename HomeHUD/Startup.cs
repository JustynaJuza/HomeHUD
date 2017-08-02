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
            // Add framework services
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
                .AddUserStore<ApplicationUserStore>()
                .AddRoleStore<ApplicationRoleStore>()
                .AddDefaultTokenProviders();

            services.AddAntiforgeryToken(Configuration);

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

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ApplicationDbContext context)
        {
            app.InitializeSimpleInjectorContainer(_container, Configuration);
            _container.Verify();

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
