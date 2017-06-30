import pika #amqp library for RabbitMq connections
import logging
import json

LOGGER = logging.getLogger(__name__)

with open('appsettings.youShallNotCommitThis.json') as dataFile:
    data = json.load(dataFile)
    rabbitMqCredentials = data['RabbitMq']['Credentials']

CONNECTION_URI = 'amqp://{0}:{1}@{2}:{3}/{4}'.format(
    rabbitMqCredentials['Username'],
    rabbitMqCredentials['Password'],
    rabbitMqCredentials['Server'],
    rabbitMqCredentials['Port'],
    rabbitMqCredentials['VirtualHost'])

class QueueConsumer(object):

    EXCHANGE = 'message'
    EXCHANGE_TYPE = 'topic'
    QUEUE = 'text'
    ROUTING_KEY = 'example.text'

    def __init__(self, message_processing_function):
        self._message_processing_function = message_processing_function
        self._url = CONNECTION_URI

    def connect(self):
        return pika.SelectConnection(
            pika.URLParameters(self._url),
            self.on_connection_open,
            stop_ioloop_on_close=False)

    def on_connection_open(self, unused_connection):
        LOGGER.info('Connection opened')
        LOGGER.info('Adding connection close callback')
        self._connection.add_on_close_callback(self.on_connection_closed)

        self.open_channel()

    def on_connection_closed(self, connection, reply_code, reply_text):
        self._channel = None
        if self._closing:
            self._connection.ioloop.stop()
        else:
            LOGGER.warning('Connection closed, reopening in 5 seconds: (%s) %s',
                           reply_code, reply_text)
            self._connection.add_timeout(5, self.reconnect)

    def reconnect(self):
        # This is the old connection IOLoop instance, stop its ioloop
        self._connection.ioloop.stop()

        if not self._closing:

            # Create a new connection
            self._connection = self.connect()

            # There is now a new connection, needs a new ioloop to run
            self._connection.ioloop.start()

    def open_channel(self):
        LOGGER.info('Creating a new channel')
        self._connection.channel(on_open_callback=self.on_channel_open)

    def on_channel_open(self, channel):
        LOGGER.info('Channel opened')
        self._channel = channel

        LOGGER.info('Adding channel close callback')
        self._channel.add_on_close_callback(self.on_channel_closed)

        self.setup_queue()

    def on_channel_closed(self, channel, reply_code, reply_text):
        LOGGER.warning('Channel %i was closed: (%s) %s',
                       channel, reply_code, reply_text)
        self._connection.close()

    def setup_queue(self):
        rabbitMqQueue = data["RabbitMq"]["Queue"];

        LOGGER.info('Declaring queue %s', rabbitMqQueue["Name"])
        self._channel.queue_declare(
            callback=self.on_queue_declare,
            queue=rabbitMqQueue["Name"],
            durable=rabbitMqQueue["Durable"],
            auto_delete=rabbitMqQueue["AutoDelete"],
            passive=False)

    def on_queue_declare(self, method_frame):
        LOGGER.info('Queue declared')
        self.read_messages()

    def read_messages(self):
        self.add_on_cancel_callback()

        rabbitMqQueue = data["RabbitMq"]["Queue"];

        LOGGER.info('Starting message reading')
        self._consumer_tag = self._channel.basic_consume(
            consumer_callback=self.on_message,
            queue=rabbitMqQueue["Name"],
            no_ack=rabbitMqQueue["NoAck"],
            exclusive=rabbitMqQueue["Exclusive"],
            consumer_tag="homehudPi")

    def add_on_cancel_callback(self):
        LOGGER.info('Adding consumer cancellation callback')
        self._channel.add_on_cancel_callback(self.on_consumer_cancelled)

    def on_consumer_cancelled(self, method_frame):
        LOGGER.info('Consumer was cancelled remotely, shutting down: %r',
                    method_frame)
        if self._channel:
            self._channel.close()

    def on_message(self, unused_channel, basic_deliver, properties, message):
        LOGGER.info(
            'Received message #%s from %s: %s',
            basic_deliver.delivery_tag,
            properties.app_id,
            message)

        self.acknowledge_message(basic_deliver.delivery_tag)

        if(self._message_processing_function):
            self._message_processing_function(message)

    def acknowledge_message(self, delivery_tag):
        LOGGER.info('Acknowledging message #%s', delivery_tag)
        self._channel.basic_ack(delivery_tag)

    def stop_consuming(self):
        if self._channel:
            LOGGER.info('Notifying RabbitMQ we want to cancel consuming')
            self._channel.basic_cancel(self.on_cancel, self._consumer_tag)

    def on_cancel(self, unused_frame):
        LOGGER.info('RabbitMQ acknowledged the cancellation of the consumer')
        self.close_channel()

    def close_channel(self):
        LOGGER.info('Closing the channel')
        self._channel.close()

    def run(self):
        self._connection = self.connect()
        self._connection.ioloop.start()

    def stop(self):
        """Cleanly shutdown the connection to RabbitMQ by stopping the consumer
        with RabbitMQ. When RabbitMQ confirms the cancellation, on_cancelok
        will be invoked by pika, which will then closing the channel and
        connection. The IOLoop is started again because this method is invoked
        when CTRL-C is pressed raising a KeyboardInterrupt exception. This
        exception stops the IOLoop which needs to be running for pika to
        communicate with RabbitMQ. All of the commands issued prior to starting
        the IOLoop will be buffered but not processed.

        """
        LOGGER.info('Stopping')
        self._closing = True
        self.stop_consuming()
        self._connection.ioloop.start()
        LOGGER.info('Stopped')

    def close_connection(self):
        LOGGER.info('Closing connection')
        self._connection.close()