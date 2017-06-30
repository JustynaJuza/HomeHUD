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

        try:

            messageParts = message.decode().split(',')
            lightState = int(messageParts[0].strip())
            lightIdsStr = messageParts[1].strip().split(' ')
            # if no light ids provided means all lights should be switched to lightState
            # mapping to list since otherwise would be lazily evaluated and would cause mayhem!
            lightIds = list(map(int, lightIdsStr)) if lightIdsStr != [''] else None

        except ValueError:
            LOGGER.error('Parsing message {0} failed'.format(message))

        lightSwitcher.switch_lights(lightState, lightIds)

        lightsState = []
        for piLight in lightSwitcher.PiLights:
            light = Light(piLight.Id, piLight.State)
            lightsState.append(light)

        self._api.postJson(self._url, None, lightsState)