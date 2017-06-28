import pika #amqp library for RabbitMq connections
import json

from pprint import pprint
from QueueConsumer import QueueConsumer


with open("settings.json") as dataFile:
    data = json.load(dataFile)

rabbitMqCredentials = data["RabbitMq"]["Credentials"]
connectionUri = "amqp://{0}:{1}@{2}:{3}/{4}".format(
    rabbitMqCredentials["Username"],
    rabbitMqCredentials["Password"],
    rabbitMqCredentials["Server"],
    rabbitMqCredentials["Port"],
    rabbitMqCredentials["VirtualHost"])

pprint(connectionUri)

parameters = pika.URLParameters(connectionUri)

# Step #3
def on_open(connection):
    connection.channel(on_channel_open)

# Step #4
def on_channel_open(channel):
    rabbitMqQueue = data["RabbitMq"]["Queue"];

    channel.queue_declare(
        callback=consume_messages,
        queue=rabbitMqQueue["Name"],
        durable=rabbitMqQueue["Durable"],
        auto_delete=rabbitMqQueue["AutoDelete"],
        passive=False)


def consume_messages(channel):
    rabbitMqQueue = data["RabbitMq"]["Queue"];

    channel.basic_consume(
        callback=process_message,
        queue=rabbitMqQueue["Name"],
        no_ack=rabbitMqQueue["NoAck"],
        exclusive=rabbitMqQueue["Exclusive"],
        consumer_tag="homehudPi")


# Step #1: Connect to RabbitMQ
connection = pika.SelectConnection(
    parameters=parameters,
    on_open_callback=on_open)

try:
    # Step #2 - Block on the IOLoop
    connection.ioloop.start()

# Catch a Keyboard Interrupt to make sure that the connection is closed cleanly
except KeyboardInterrupt:

    # Gracefully close the connection
    connection.close()

    # Start the IOLoop again so Pika can communicate, it will stop on its own when the connection is closed
    connection.ioloop.start()

input("Enter something: ")


#channel.exchange_declare(exchange='heartbit', auto_delete=True, type='fanout')