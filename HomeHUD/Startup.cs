using HomeHUD;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]
namespace HomeHUD
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var container = SimpleInjectorInitializer.Initialize(app);
            ConfigureAuth(app, container);
        }
    }
}
