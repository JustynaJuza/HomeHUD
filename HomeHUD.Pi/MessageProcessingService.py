import logging

#from EnergenieLightSwitcher import EnergenieLightSwitcher

LOGGER = logging.getLogger(__name__)

class MessageProcessingService(object):

    def process_message(self, message):
        #lightSwitcher = EnergenieLightSwitcher()

        messageParts = message.decode().split(',')
        lightState = messageParts[0].strip()
        lightIds = messageParts[1].strip().split(' ')

        for lightId in lightIds:
            LOGGER.info('Swiching light ' + lightId + ': ' + lightState)
            #lightSwitcher.switch_light(lightId, lightState)