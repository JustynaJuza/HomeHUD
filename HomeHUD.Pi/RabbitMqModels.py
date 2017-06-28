class RabbitMqCredentials(object):

   def __init__(self, username, password, server, port, virtualHost):
      self.Username = username
      self.Password = password
      self.Server = server
      self.Port = port
      self.VirtualHost = virtualHost


class RabbitMqQueue(object):

   def __init__(self, name, durable, autoDelete, noAck, exclusive):
      self.Name = name
      self.Durable = durable
      self.AutoDelete = autoDelete
      self.NoAck = noAck
      self.Exclusive = exclusive