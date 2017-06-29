#!/usr/bin/python

import pika
import configparser


def main(username, password, server, port, queue, turnon):
    credentials = pika.PlainCredentials(username, password)
    connection = pika.BlockingConnection(pika.ConnectionParameters(server, port, '/', credentials))
    channel = connection.channel()

    channel.basic_publish(exchange='', routing_key=queue, body=turnon)


if __name__ == "__main__":
    config = configparser.ConfigParser()
    config.read('switchers.cfg')
    Username = config['rabbitcfg']['Username']
    Password = config['rabbitcfg']['Password']
    Server = config['rabbitcfg']['Server']
    Port = config['rabbitcfg']['Port']
    TurnOn = config['turnon']['command']
    Queue = config['turnon']['queue']

    main(Username, Password, Server, int(Port), Queue, TurnOn)
