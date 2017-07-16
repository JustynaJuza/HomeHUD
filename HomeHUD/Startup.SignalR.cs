using HomeHUD.Services;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace HomeHUD
{
    public static class SignalRStartup
    {
        public static void AddSignalRFramework(this IServiceCollection services)
        {
            var signalRFriendlySerializer = JsonSerializer.Create(new JsonSerializerSettings
            {
                ContractResolver = new SignalRContractResolver()
            });

            services.Add(
                new ServiceDescriptor(typeof(JsonSerializer),
                provider => signalRFriendlySerializer,
                ServiceLifetime.Transient));

            services.AddSignalR();
        }
    }
}
