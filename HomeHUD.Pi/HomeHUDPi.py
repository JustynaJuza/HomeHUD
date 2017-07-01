import sys
import pika #amqp library for RabbitMq connections
import json
import LoggingConfig

from MessageProcessingService import MessageProcessingService
from QueueConsumer import QueueConsumer
#from RabbitMqModels import RabbitMqCredentials

def main(argv):

    messageProcessingService = MessageProcessingService()
    rabbitMqService = QueueConsumer(messageProcessingService.process_message)

    try:
        rabbitMqService.run()
    except KeyboardInterrupt:
        rabbitMqService.stop()


if __name__ == '__main__':
    main(sys.argv[1:])