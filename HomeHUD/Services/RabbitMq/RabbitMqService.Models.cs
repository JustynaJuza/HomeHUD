namespace HomeHUD.Services
{
    public class RabbitMq
    {
        public class Credentials
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string Server { get; set; }
            public string Port { get; set; }
            public string VirtualHost { get; set; }
        }

        public class Queue
        {
            public string Name { get; set; }
            public bool Durable { get; set; }
            public bool AutoDelete { get; set; }
            public bool NoAck { get; set; }
            public bool Exclusive { get; set; }
        }
    }
}
