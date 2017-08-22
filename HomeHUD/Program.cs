using Microsoft.AspNetCore.Hosting;
using System.Globalization;
using System.IO;

namespace HomeHUD
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var culture = new CultureInfo("en-GB");
            CultureInfo.DefaultThreadCurrentCulture = culture;
            CultureInfo.DefaultThreadCurrentUICulture = culture;

            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseSetting("detailedErrors", "false")
                .CaptureStartupErrors(true)
                .Build();

            host.Run();
        }
    }
}
