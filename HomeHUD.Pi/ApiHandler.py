import requests
import logging
import json

LOGGER = logging.getLogger(__name__)

class ApiHandler(object):

    def __init__(self):
        return

    def serialize_as_dict(self, obj):
        return obj.__dict__

    def postJson(self, url, params, data):

        jsonData=json.dumps(data, default=self.serialize_as_dict)
        # random hack to prevent requests.post escaping double quotes with \\
        # basically replaces double quotes with single quotes, supposedly parsing to Python objects, pff
        # God knows why this works, maybe I'll learn someday
        otherJson = json.loads(jsonData)

        LOGGER.info("Sending json data to {0} with parameters {1}: \n{2}"
            .format(url, params, otherJson))
        response = requests.post(url, data=params, json=otherJson)

        if response.status_code == requests.codes.ok:
            LOGGER.info("Request sent to {0} responded OK".format(url))
            return response.text
        else:
            LOGGER.error("Request sent to {0} responded with error code {1}: {2}".format(url, response.status_code, response.text))