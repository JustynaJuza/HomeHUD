using HomeHUD.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Exceptions;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;

namespace HomeHUD.Services
{
    public interface IRabbitMqService
    {
        bool SendLightState(LightStateViewModel lightState);
        bool SendLightsState(IEnumerable<int> lightIds, LightSwitchState state);
    }

    public class RabbitMqService : IRabbitMqService
    {
        private readonly RabbitMq.Credentials _credentials;
        private readonly RabbitMq.Formatting _formatting;

        public RabbitMqService(
            RabbitMq.Credentials credentials,
            RabbitMq.Formatting formatting)
        {
            _credentials = credentials;
            _formatting = formatting;
        }

        private bool SendMessage(string message)
        {
            var factory = new ConnectionFactory
            {
                Uri = string.Format(
                    "amqp://{0}:{1}@{2}:{3}/{4}",
                    _credentials.Username,
                    _credentials.Password,
                    _credentials.Server,
                    _credentials.Port,
                    _credentials.VirtualHost)
            };

            try
            {
                using (var connection = factory.CreateConnection())
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: "homehudToPi",
                                         durable: true,
                                         exclusive: false,
                                         autoDelete: false,
                                         arguments: null);

                    var properties = channel.CreateBasicProperties();
                    properties.Persistent = true;
                    properties.Expiration = "18000000";
                    properties.AppId = Assembly.GetEntryAssembly().GetName().Name;
                    //properties.ContentType = "text/plain";

                    var messageBody = Encoding.UTF8.GetBytes(message);

                    channel.BasicPublish(exchange: "",
                                                     routingKey: "homehudToPi",
                                                     basicProperties: properties,
                                                     body: messageBody);

                    Debug.WriteLine($"Sent message to RabbitMQ: {message}");
                }
            }
            catch (BrokerUnreachableException)
            {
                return false;
            }

            return true;
        }

        public bool SendLightState(LightStateViewModel lightState)
        {
            var message = $"{(int) lightState.State}, {lightState.LightId}";
            return SendMessage(message);
        }

        public bool SendLightsState(IEnumerable<int> lightIds, LightSwitchState state)
        {
            var lightIdsMessage = new StringBuilder();
            foreach (var id in lightIds ?? Enumerable.Empty<int>())
            {
                lightIdsMessage.Append($"{id} ");
            }

            var message = $"{(int) state}, {lightIdsMessage.ToString().TrimEnd()}";
            return SendMessage(message);
        }

        public bool SendMiLightCommand(LightStateViewModel lightState)
        {
            var message = $"{_formatting.MiLight.Prefix}, {lightState.LightId}, {(int) lightState.State}";
            return SendMessage(message);

        }
    }

    //class Receive
    //{
    //    public static void Main()
    //    {
    //        var factory = new ConnectionFactory() { HostName = "localhost" };
    //        using (var connection = factory.CreateConnection())
    //        using (var channel = connection.CreateModel())
    //        {
    //            channel.QueueDeclare(queue: "homehudToPi",
    //                                 durable: true,
    //                                 exclusive: false,
    //                                 autoDelete: false,
    //                                 arguments: null);

    //            channel.BasicQos(0, 1, false);

    //            var consumer = new EventingBasicConsumer(channel);
    //            consumer.Received += (model, ea) =>
    //            {
    //                var body = ea.Body;
    //                var message = Encoding.UTF8.GetString(body);
    //                Console.WriteLine(" [x] Received {0}", message);
    //            };

    //            channel.BasicConsume(queue: "homehud",
    //                                 noAck: false,
    //                                 consumer: consumer);

    //            Console.WriteLine(" Press [enter] to exit.");
    //            Console.ReadLine();
    //        }
    //    }
    //}
}
