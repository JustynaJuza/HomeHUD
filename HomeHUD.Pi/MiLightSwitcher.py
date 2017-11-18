import logging

from ArgumentParser import debuggingOnPC
from AppSettingsProvider import AppSettingsProvider
from MiLightGroups import ColorGroup

class MiLightSwitcher(object):

    def __init__(self):
        appSettings = AppSettingsProvider()
        miLightSettings = appSettings.get_miLight_settings()
        self._bridgeIp = miLightSettings.BridgeIp
        self._messagePrefix = miLightSettings.MessagePrefix

    def has_message_prefix(self, messageParts):
        return messageParts[0] == self._messagePrefix

    def switch_lights(self, lightGroup, command, value):
        group = ColorGroup(lightGroup, self._bridgeIp)
        group.resolve_command(command, value)