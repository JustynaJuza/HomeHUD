import logging
import json

from ApiHandler import ApiHandler
from EnergenieLightSwitcher import EnergenieLightSwitcher

LOGGER = logging.getLogger(__name__)

with open('appsettings.youShallNotCommitThis.json') as dataFile:
    data = json.load(dataFile)
    homehudWeb = data['HomeHud.Web']

class Light(object):

   def __init__(self, id, state, color = None, brightness = None):
        self.Id = id
        self.State = state
        self.Color = color
        self.Brightness = brightness


URL = 'http://{0}/{1}'.format(
    homehudWeb['Server'],
    homehudWeb['ConfirmLights'])

class MessageProcessingService(object):

    def __init__(self):
        self._api = ApiHandler()
        self._url = URL

    def process_message(self, message):
        lightSwitcher = EnergenieLightSwitcher()

        #try:
        messageParts = message.decode().split(',')
        lightState = int(messageParts[0].strip())
        lightIds = map(int, messageParts[1].strip().split(' '))
        #except:
        #    LOGGER.error('Parsing message "' + message + '" failed')

        for lightId in lightIds:
            LOGGER.info('Swiching light {0}: {1}'.format(lightId, lightState))
            lightSwitcher.switch_light(lightId, lightState)

        lightsState = []
        for piLight in lightSwitcher.PiLights:
            light = Light(piLight.Id, piLight.State)
            lightsState.append(light)

        self._api.postJson(self._url, None, lightsState)