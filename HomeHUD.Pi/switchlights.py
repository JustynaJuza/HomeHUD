#!/usr/bin/python

import pika
import configparser

Config = configparser.ConfigParser()


def main(username, password, server, port, queue):
    credentials = pika.PlainCredentials(username, password)
    connection = pika.BlockingConnection(pika.ConnectionParameters(server, port, '/', credentials))
    channel = connection.channel()
    channel.basic_publish(exchange='', routing_key=queue, body='sl1')
    channel.basic_publish(exchange='', routing_key=queue, body='sl2')
    channel.basic_publish(exchange='', routing_key=queue, body='sl3')
    channel.basic_publish(exchange='', routing_key=queue, body='sl4')


def switch_lights():
    config = configparser.ConfigParser()
    config.read('switchers.cfg')
    username = config['rabbitcfg']['Username']
    password = config['rabbitcfg']['Password']
    server = config['rabbitcfg']['Server']
    port = config['rabbitcfg']['Port']
    queue = config['switchers']['queue']
    main(username, password, server, int(port), queue)


if __name__ == "__main__":
    switch_lights()
