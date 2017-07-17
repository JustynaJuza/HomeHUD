import json
import os

from AppSettingsModels import RabbitMqCredentials, RabbitMqQueue, HomeHud

class AppSettingsProvider(object):

    def __init__(self, appSettingsFileName):
        self._appData = self.load_settings(appSettingsFileName)

    def load_settings(self, appSettingsFileName):
        currentPath = os.path.dirname(__file__)
        settingsFile = os.path.join(currentPath, appSettingsFileName)

        with open(settingsFile, 'r') as jsonFile:
            data = json.load(jsonFile)

        return data

    def get_rabbitMq_credentials(self):
        rabbitMqCredentials = self._appData['RabbitMq']['Credentials']

        return RabbitMqCredentials(
            rabbitMqCredentials['Username'],
            rabbitMqCredentials['Password'],
            rabbitMqCredentials['Server'],
            rabbitMqCredentials['Port'],
            rabbitMqCredentials['VirtualHost'])

    def get_rabbitMq_queue(self):
        rabbitMqQueue = self._appData["RabbitMq"]["Queue"];

        return RabbitMqQueue(
            rabbitMqQueue['Name'],
            rabbitMqQueue['Durable'],
            rabbitMqQueue['AutoDelete'],
            rabbitMqQueue['NoAck'],
            rabbitMqQueue['Exclusive'])

    def get_request_server(self):
        homehudWeb = self._appData['HomeHud.Web']

        return HomeHud(
            homehudWeb['ServerLocal'],
            homehudWeb['ServerExternal'],
            homehudWeb['AntiforgeryToken'],
            homehudWeb['ConfirmLights'])

