import sys
import pika #amqp library for RabbitMq connections
import json
import LoggingConfig

from AppSettingsProvider import AppSettingsProvider
from MessageProcessingService import MessageProcessingService
from QueueConsumer import QueueConsumer

APPSETTINGS_FILE = 'appsettings.youShallNotCommitThis.json'

def main(argv):

    appSettings = AppSettingsProvider(appSettingsFileName=APPSETTINGS_FILE)

    messageProcessingService = MessageProcessingService(
        requestServer = appSettings.get_request_server())

    rabbitMqService = QueueConsumer(
        rabbitMqCredentials=appSettings.get_rabbitMq_credentials(),
        rabbitMqQueue=appSettings.get_rabbitMq_queue(),
        messageProcessingFunction = messageProcessingService.process_message)

    try:
        rabbitMqService.run()
    except KeyboardInterrupt:
        rabbitMqService.stop()


if __name__ == '__main__':
    main(sys.argv[1:])