using HomeHUD.Services;
using Microsoft.AspNetCore.SignalR.Hubs;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using SimpleInjector;

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

            services.AddSignalR(options =>
            {
                options.Hubs.EnableDetailedErrors = true;
            });
        }
    }

    public class SimpleInjectorHubActivator : IHubActivator
    {
        private readonly Container _container;

        public SimpleInjectorHubActivator(Container container)
        {
            _container = container;

        }

        public IHub Create(HubDescriptor descriptor)
        {
            return (IHub) _container.GetInstance(descriptor.HubType);
        }
    }
}
