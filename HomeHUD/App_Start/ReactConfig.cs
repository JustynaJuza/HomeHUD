using HomeHUD;
using React;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ReactConfig), "Configure")]

namespace HomeHUD
{
    public static class ReactConfig
    {
        public static void Configure()
        {
            // use server side rendering of components
            ReactSiteConfiguration.Configuration
                .SetLoadBabel(false)
                .AddScriptWithoutTransform("~/Scripts/app/server.bundle.js");
        }
    }
}