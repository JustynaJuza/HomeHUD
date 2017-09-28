using FluentScheduler;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace HomeHUD
{
    public static class ApplicationLifetimeExtensions
    {
        public static void AddApplicationLifetimeEvents(this IApplicationBuilder app, IApplicationLifetime lifetime)
        {
            lifetime.ApplicationStopping.Register(() => ApplicationLifetimeEvents.ApplicationStopping(app));
        }
    }

    public static class ApplicationLifetimeEvents
    {
        public static void ApplicationStopping(IApplicationBuilder app)
        {
            var loggerFactory = (ILoggerFactory) app.ApplicationServices.GetService(typeof(ILoggerFactory));
            loggerFactory.CreateLogger(Assembly.GetEntryAssembly().GetName().Name).LogInformation("Application closing.");

            JobManager.StopAndBlock();
        }
    }
}
