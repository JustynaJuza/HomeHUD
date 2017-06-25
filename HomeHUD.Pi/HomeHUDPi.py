import pika #amqp library for RabbitMq connections
import json

from pprint import pprint

with open("settings.json") as dataFile:    
    data = json.load(dataFile)

rabbitMqCredentials = data["RabbitMqCredentials"]
connectionUri = "amqp://{0}:{1}@{2}/{3}".format(
    rabbitMqCredentials["Username"], 
    rabbitMqCredentials["Password"], 
    rabbitMqCredentials["Server"], 
    rabbitMqCredentials["VirtualHost"])

pprint(connectionUri)

parameters = pika.URLParameters(connectionUri)

input("Enter something: ")


#channel.exchange_declare(exchange='heartbit', auto_delete=True, type='fanout')