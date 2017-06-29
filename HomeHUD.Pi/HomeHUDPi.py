import pika #amqp library for RabbitMq connections
import json

from QueueConsumer import QueueConsumer
from RabbitMqModels import RabbitMqCredentials


#with open("settings.json") as dataFile:
#    data = json.load(dataFile)

#rabbitMqCredentialsData = data["RabbitMq"]["Credentials"]
#rabbitMqCredentials = RabbitMqCredentials(

#)

#pprint(connectionUri)

def main():
    example = QueueConsumer()
    try:
        example.run()
    except KeyboardInterrupt:
        example.stop()


if __name__ == '__main__':
    main()