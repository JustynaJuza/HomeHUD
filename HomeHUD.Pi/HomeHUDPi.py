import pika #amqp library for RabbitMq connections
import json
import LoggingConfig

from QueueConsumer import QueueConsumer
from RabbitMqModels import RabbitMqCredentials
from MessageProcessingService import MessageProcessingService

def main():

    messageProcessingService = MessageProcessingService()
    rabbitMqService = QueueConsumer(messageProcessingService.process_message)

    try:
        rabbitMqService.run()
    except KeyboardInterrupt:
        rabbitMqService.stop()


if __name__ == '__main__':
    main()