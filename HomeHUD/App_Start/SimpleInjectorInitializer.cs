using System.Collections.Generic;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using HomeHUD.Models;
using HomeHUD.Models.Users;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Owin;
using SimpleInjector;
using SimpleInjector.Advanced;
using SimpleInjector.Integration.Web;
using SimpleInjector.Integration.Web.Mvc;
using HomeHUD.Models.DbContext;

namespace HomeHUD
{
    public static class SimpleInjectorInitializer
    {
        /// <summary>Initialize the container and register it as MVC3 Dependency Resolver.</summary>
        public static Container Initialize(IAppBuilder app)
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new WebRequestLifestyle();

            InitializeContainer(container, app);

            container.Verify();

            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(container));

            return container;
        }

        private static void InitializeContainer(Container container, IAppBuilder app)
        {
            //container.RegisterSingleton(app);
            container.RegisterMvcControllers(Assembly.GetExecutingAssembly());

            // Data Access
            container.RegisterPerWebRequest<ApplicationDbContext>();

            // ASP.Net Identity
            container.RegisterPerWebRequest<IRoleStore<Role, int>>(() => new RoleStore<Role, int, UserRole>(container.GetInstance<ApplicationDbContext>()));
            container.RegisterPerWebRequest<RoleManager<Role, int>>();

            container.RegisterPerWebRequest<IUserStore<User, int>>(() => new UserStore<User, Role, int, UserLogin, UserRole, UserClaim>(container.GetInstance<ApplicationDbContext>()));
            container.RegisterPerWebRequest<ApplicationUserManager>();
            container.RegisterInitializer<ApplicationUserManager>(manager => ApplicationUserManager.Configure(manager, app));
            container.RegisterPerWebRequest<ApplicationSignInManager, ApplicationSignInManager>();

            container.RegisterPerWebRequest(() => container.IsVerifying()
                ? new OwinContext(new Dictionary<string, object>()).Authentication
                : HttpContext.Current.GetOwinContext().Authentication);
        }
    }
}