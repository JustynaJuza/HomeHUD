__author__ = 'bziobrow'

import pika
import datetime
import RPi.GPIO as GPIO
import time
import logging


class EnergenieLightSwitcher(object):

    LIGHT_1_ON = [(11, True)(15, True)(16, True)(13, True)]
    LIGHT_1_OFF = [(11, True)(15, True)(16, True)(13, False)]
    LIGHT_2_ON = [(11, False)(15, True)(16, True)(13, True)]
    LIGHT_2_OFF = [(11, False)(15, True)(16, True)(13, False)]
    LIGHT_3_ON = [(11, True)(15, False)(16, True)(13, True)]
    LIGHT_3_OFF = [(11, True)(15, False)(16, True)(13, False)]
    LIGHT_4_ON = [(11, False)(15, False)(16, True)(13, True)]
    LIGHT_4_OFF = [(11, False)(15, False)(16, True)(13, False)]

    def __init__(self):
        # set the pins numbering mode
        GPIO.setmode(GPIO.BOARD)
        # Select the GPIO pins used for the encoder K0-K3 data inputs
        GPIO.setup(11, GPIO.OUT)
        GPIO.setup(15, GPIO.OUT)
        GPIO.setup(16, GPIO.OUT)
        GPIO.setup(13, GPIO.OUT)
        # Select the signal to select ASK/FSK
        GPIO.setup(18, GPIO.OUT)
        # Select the signal used to enable/disable the modulator
        GPIO.setup(22, GPIO.OUT)
        # Disable the modulator by setting CE pin lo
        GPIO.output(22, False)
        # Set the modulator to ASK for On Off Keying
        # by setting MODSEL pin lo
        GPIO.output(18, False)
        # Initialise K0-K3 inputs of the encoder to 0000
        GPIO.output(11, False)
        GPIO.output(15, False)
        GPIO.output(16, False)
        GPIO.output(13, False)

        logging.basicConfig(level=logging.INFO,
                            format='%(asctime)s %(levelname)-8s %(message)s',
                            datefmt='%a, %d %b %Y %H:%M:%S',
                            filename='switcher.log',
                            filemode='a')

    def switch_off_first(self):
        logging.info("sending code 0111 Socket 1 off")
        self.set_output_sequence(sequence = LIGHT_1_OFF)
        self.run_modulator()

    def switch_on_first(self):
        logging.info("sending code 1111 socket 1 on")
        self.set_output_sequence(sequence = LIGHT_1_ON)
        self.run_modulator()

    def switch_on_second(self):
        logging.info("sending code 1110 Socket 2 on")
        self.set_output_sequence(sequence = LIGHT_2_ON)
        self.run_modulator()

    def switch_off_second(self):
        logging.info("sending code 0110 socket 2 off")
        self.set_output_sequence(sequence = LIGHT_2_OFF)
        self.run_modulator()

    def switch_on_third(self):
        logging.info("sending code 1101 Socket 3 on")
        self.set_output_sequence(sequence = LIGHT_3_ON)
        self.run_modulator()

    def switch_off_third(self):
        logging.info("sending code 0101 socket 3 off")
        self.set_output_sequence(sequence = LIGHT_3_OFF)
        self.run_modulator()


    def switch_on_fourth(self):
        logging.info("sending code 1100 Socket 4 on")
        self.set_output_sequence(sequence = LIGHT_4_ON)
        self.run_modulator()

    def switch_off_fourth(self):
        logging.info("sending code 0100 socket 4 off")
        self.set_output_sequence(sequence = LIGHT_4_OFF)
        self.run_modulator()

    def set_output_sequence(self, sequence = [()]):
        for pinState in sequence:
            self.setSinglePinState(pinState)

    def setSinglePinState(self, pinState):
            pin = pinState[0]
            state = pinState[1]
            GPIO.output(pin, state)

    def run_modulator(self):
        # let it settle, encoder requires this
        time.sleep(0.1)

         # Enable the modulator
        GPIO.output(22, True)
        # keep enabled for a period
        time.sleep(0.25)
        # Disable the modulator
        GPIO.output(22, False)
