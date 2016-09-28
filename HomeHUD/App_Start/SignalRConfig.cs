using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;
using SimpleInjector;
using System;
using System.Reflection;

namespace HomeHUD
{
    public partial class SignalRConfig
    {
        public class SignalRCamelCaseContractResolver : IContractResolver
        {
            private readonly Assembly _signalRInternalAssembly;
            private readonly IContractResolver _camelCaseContractResolver;
            private readonly IContractResolver _defaultContractSerializer;

            public SignalRCamelCaseContractResolver()
            {
                _defaultContractSerializer = new DefaultContractResolver();
                _camelCaseContractResolver = new CamelCasePropertyNamesContractResolver();
                _signalRInternalAssembly = typeof(Connection).Assembly;
            }

            public JsonContract ResolveContract(Type type)
            {
                return type.Assembly.Equals(_signalRInternalAssembly)
                    ? _defaultContractSerializer.ResolveContract(type)
                    : _camelCaseContractResolver.ResolveContract(type);
            }
        }

        public static void Configure(IAppBuilder app, Container container)
        {
            var config = new HubConfiguration
            {
                EnableDetailedErrors = true
            };

            AdjustConnectionTimeouts();

            var activator = new SimpleInjectorScopedHubActivator(container);
            GlobalHost.DependencyResolver.Register(typeof(IHubActivator), () => activator);
            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), GetSignalRCamelCaseJsonSerializer);

            app.MapSignalR(config);
        }

        private static void AdjustConnectionTimeouts()
        {
            // Make long polling connections wait a maximum of 110 seconds for a
            // response. When that time expires, trigger a timeout command and
            // make the client reconnect.
            GlobalHost.Configuration.ConnectionTimeout = TimeSpan.FromSeconds(110);

            // Wait a maximum of 30 seconds after a transport connection is lost
            // before raising the Disconnected event to terminate the SignalR connection.
            GlobalHost.Configuration.DisconnectTimeout = TimeSpan.FromSeconds(6);

            // For transports other than long polling, send a keepalive packet every
            // 10 seconds. 
            // This value must be no more than 1/3 of the DisconnectTimeout value.
            GlobalHost.Configuration.KeepAlive = TimeSpan.FromSeconds(2);
        }

        private static JsonSerializer GetSignalRCamelCaseJsonSerializer()
        {
            var settings = new JsonSerializerSettings
            {
                ContractResolver = new SignalRCamelCaseContractResolver()
            };

            return JsonSerializer.Create(settings);
        }
    }
}