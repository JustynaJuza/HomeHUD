import pika
import json

from pprint import pprint

with open('settings.json') as data_file:    
    data = json.load(data_file)

pprint(data)

input("Enter something: ")
#parameters = pika.URLParameters('amqp://guest:guest@rabbit-server1:5672/%2F?backpressure_detection=t')


#channel.exchange_declare(exchange='heartbit', auto_delete=True, type='fanout')