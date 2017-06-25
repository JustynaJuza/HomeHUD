#!/usr/bin/python

__author__ = 'bziobrow'

import pika
import configparser
import datetime
from astral import Astral

Config = configparser.ConfigParser()


def main(username, password, server, port, queue):
    city_name = 'London'
    a = Astral()
    a.solar_depression = 'civil'
    city = a[city_name]
    now = datetime.datetime.now()

    sun = city.sun(date=now, local=True)

    credentials = pika.PlainCredentials(username, password)
    connection = pika.BlockingConnection(pika.ConnectionParameters(server, port, '/', credentials))
    channel = connection.channel()

    sunset = sun['sunset'].replace(tzinfo=None) - datetime.timedelta(minutes=120)

    print('now:' + str(now))
    print('sunset' + str(sunset))

    if (now > sunset) and (now < now.replace(hour=22, minute=0)):
        channel.basic_publish(exchange='', routing_key=queue, body='sl1on')
        channel.basic_publish(exchange='', routing_key=queue, body='sl2on')
        channel.basic_publish(exchange='', routing_key=queue, body='sl3on')
        channel.basic_publish(exchange='', routing_key=queue, body='sl4on')
    else:
        channel.basic_publish(exchange='', routing_key=queue, body='sl1off')
        channel.basic_publish(exchange='', routing_key=queue, body='sl2off')
        channel.basic_publish(exchange='', routing_key=queue, body='sl3off')
        channel.basic_publish(exchange='', routing_key=queue, body='sl4off')


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
