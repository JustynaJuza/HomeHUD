using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(StandaloneAssessmentModule.Startup))]
namespace StandaloneAssessmentModule
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
