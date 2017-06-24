using HomeHUD.Models;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;

namespace HomeHUD.Services
{
    public interface IRabbitMqService
    {
        bool SendLightState(int lightId, LightSwitchState state);
        bool SendLightsState(IEnumerable<int> lightIds, LightSwitchState state);
    }

    public class RabbitMqService : IRabbitMqService
    {
        private readonly RabbitMqCredentials _credentials;

        public RabbitMqService(IOptions<RabbitMqCredentials> credentials)
        {
            _credentials = credentials.Value;
        }

        private bool SendMessage(string message)
        {
            var factory = new ConnectionFactory()
            {
                Uri = string.Format(
                    "amqp://{0}:{1}@{2}/{3}",
                    _credentials.Username,
                    _credentials.Password,
                    _credentials.Server,
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
                    //properties.ContentType = "text/plain";

                    var messageBody = Encoding.UTF8.GetBytes(message);

                    channel.BasicPublish(exchange: "",
                                                     routingKey: "homehudToPi",
                                                     basicProperties: properties,
                                                     body: messageBody);
                    Console.WriteLine(" [x] Sent {0}", message);
                }
            }
            catch (BrokerUnreachableException ex)
            {
                return false;
            }

            return true;
        }

        public bool SendLightState(int lightId, LightSwitchState state)
        {
            var message = $"{state} {lightId}";
            return SendMessage(message);
        }

        public bool SendLightsState(IEnumerable<int> lightIds, LightSwitchState state)
        {
            var lightIdsMessage = new StringBuilder();
            foreach (var id in lightIds)
            {
                lightIdsMessage.Append($"{id} ");
            }

            var message = $"{state} {lightIdsMessage.ToString().TrimEnd()}";
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
