import pika
import time
import logging

from ArgumentParser import debuggingOnPC

# when debugging on PC do not import GPIO, use this flag in code for conditional interactions
if not debuggingOnPC:
    import RPi.GPIO as GPIO

LOGGER = logging.getLogger(__name__)

class PiLight(object):

   def __init__(self, id, state, onSequence, offSequence):
      self.Id = id
      self.State = state
      self.OnSequence = onSequence
      self.OffSequence = offSequence

LIGHTS = [
        PiLight(
            id=1,
            state=0,
            onSequence=[(11, True),(15, True),(16, True),(13, True)],
            offSequence=[(11, True),(15, True),(16, True),(13, False)]
        ),
        PiLight(
            id=2,
            state=0,
            onSequence=[(11, False),(15, True),(16, True),(13, True)],
            offSequence=[(11, False),(15, True),(16, True),(13, False)]
        ),
        PiLight(
            id=3,
            state=0,
            onSequence=[(11, True),(15, False),(16, True),(13, True)],
            offSequence=[(11, True),(15, False),(16, True),(13, False)]
        ),
        PiLight(
            id=4,
            state=0,
            onSequence=[(11, False),(15, False),(16, True),(13, True)],
            offSequence=[(11, False),(15, False),(16, True),(13, False)]
        )
    ]

class EnergenieLightSwitcher(object):

    def __init__(self):
        self.PiLights = LIGHTS

        if not debuggingOnPC:
            initGPIO()

    def switch_lights(self, state, lightIds = None):
        # assuming it might be faster to not check the first if on every loop
        if lightIds:
            for light in self.PiLights:
                for id in lightIds:
                    if id == light.Id:
                        self.switch_light(light, state)
                    else:
                        LOGGER.error("No light was found with id {0}".format(light.Id))
        else:
            for light in self.PiLights:
                self.switch_light(light, state)

    def switch_light(self, light, state):
        LOGGER.info('Swiching light {0}: {1}'.format(light.Id, light))

        if not debuggingOnPC:
            sequence = light.OnSequence if state==1 else light.OffSequence
            self.set_output_sequence(sequence)

        light.State=state
        LOGGER.info("Switched light {0} {1}".format(light.Id, "ON" if state==1 else "OFF"))

    def set_output_sequence(self, sequence = [()]):
        for pinState in sequence:
            self.set_single_pin_state(pinState)

        # let it settle, encoder requires this
        time.sleep(0.1)
        self.run_modulator()

    def set_single_pin_state(self, pinState):
        pin = pinState[0]
        state = pinState[1]
        GPIO.output(pin, state)

    def run_modulator(self):
        GPIO.output(22, True)
        time.sleep(0.25)
        GPIO.output(22, False)

    def initGPIO(self):
        # set the pins numbering mode
        GPIO.setmode(GPIO.BOARD)
        # select the GPIO pins used for the encoder K0-K3 data inputs
        GPIO.setup(11, GPIO.OUT)
        GPIO.setup(15, GPIO.OUT)
        GPIO.setup(16, GPIO.OUT)
        GPIO.setup(13, GPIO.OUT)
        # select the signal to select ASK/FSK
        GPIO.setup(18, GPIO.OUT)
        # select the signal used to enable/disable the modulator
        GPIO.setup(22, GPIO.OUT)
        # disable the modulator by setting CE pin lo
        GPIO.output(22, False)
        # set the modulator to ASK for On Off Keying
        # by setting MODSEL pin lo
        GPIO.output(18, False)
        # initialise K0-K3 inputs of the encoder to 0000
        GPIO.output(11, False)
        GPIO.output(15, False)
        GPIO.output(16, False)
        GPIO.output(13, False)