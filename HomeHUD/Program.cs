using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace HomeHUD
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                //.CaptureStartupErrors(true)
                .Build();

            host.Run();
        }
    }
}
