__author__ = 'bziobrow'

import pika
import datetime
import RPi.GPIO as GPIO
import time
import logging
import subprocess
from switchers import Switcher

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s %(levelname)-8s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S',
                    filename='manager.log',
                    filemode='a')

credentials = pika.PlainCredentials('ziober', 'bogumarl')
# credentials = pika.PlainCredentials('juza', 'Alfred')
connection = pika.BlockingConnection(pika.ConnectionParameters('hqo.cloudapp.net', 5672, '/', credentials))

channel = connection.channel()
# channel.queue_delete(queue='switcher')
channel.queue_declare(queue='switcher', auto_delete=True)

channel.exchange_declare(exchange='heartbit', auto_delete=True, type='fanout')

sl1flag = True
sl2flag = True
sl3flag = True
sl4flag = True


def send_turn_on_pc_signal(signal):
    if signal == 'on':
        # subprocess.Popen("wakeonlan D8:50:E6:3F:5F:2E", shell=True)
        subprocess.Popen("wakeonlan -i 10.0.0.2 -p 4343 D8:50:E6:3F:5F:2E", shell=True)
        channel.basic_publish(exchange='heartbit', routing_key='', body='pc signal sent')
        # subprocess.Popen("wakeonlan C0:4A:00:18:84:CF", shell=True)


def light_management(signal):
    sw = Switcher()
    print(" [x] Received " + signal + " " + str(datetime.datetime.utcnow()))
    global sl1flag
    global sl2flag
    global sl3flag
    global sl4flag
    if signal == 'sl1':
        if sl1flag:
            channel.basic_publish(exchange='heartbit', routing_key='', body='sl1 off')
            sw.switch_off_first()
            sl1flag = False
        else:
            channel.basic_publish(exchange='heartbit', routing_key='', body='sl1 on')
            sw.switch_on_first()
            sl1flag = True
        print('received sl1')
    if signal == 'sl2':
        if sl2flag:
            channel.basic_publish(exchange='heartbit', routing_key='', body='sl2 off')
            sw.switch_off_second()
            sl2flag = False
        else:
            channel.basic_publish(exchange='heartbit', routing_key='', body='sl2 on')
            sw.switch_on_second()
            sl2flag = True
        print('received sl2')
    if signal == 'sl3':
        if sl3flag:
            channel.basic_publish(exchange='heartbit', routing_key='', body='sl3 off')
            sw.switch_off_third()
            sl3flag = False
        else:
            channel.basic_publish(exchange='heartbit', routing_key='', body='sl3 on')
            sw.switch_on_third()
            sl3flag = True
        print('received sl3')
    if signal == 'sl4':
        if sl4flag:
            channel.basic_publish(exchange='heartbit', routing_key='', body='sl4 off')
            sw.switch_off_fourth()
            sl4flag = False
        else:
            channel.basic_publish(exchange='heartbit', routing_key='', body='sl4 on')
            sw.switch_on_fourth()
            sl4flag = True
        print('received sl4')
    if signal == 'sl1on':
        channel.basic_publish(exchange='heartbit', routing_key='', body='sl1 on')
        sw.switch_on_first()
        sl1flag = True
    if signal == 'sl1off':
        channel.basic_publish(exchange='heartbit', routing_key='', body='sl1 off')
        sw.switch_off_first()
        sl1flag = False
    if signal == 'sl2on':
        channel.basic_publish(exchange='heartbit', routing_key='', body='sl2 on')
        sw.switch_on_second()
        sl2flag = True
    if signal == 'sl2off':
        channel.basic_publish(exchange='heartbit', routing_key='', body='sl2 off')
        sw.switch_off_second()
        sl2flag = False
    if signal == 'sl3on':
        channel.basic_publish(exchange='heartbit', routing_key='', body='sl3 on')
        sw.switch_on_third()
        sl3flag = True
    if signal == 'sl3off':
        channel.basic_publish(exchange='heartbit', routing_key='', body='sl3 off')
        sw.switch_off_third()
        sl3flag = False
    if signal == 'sl4on':
        channel.basic_publish(exchange='heartbit', routing_key='', body='sl4 on')
        sw.switch_on_fourth()
        sl4flag = True
    if signal == 'sl4off':
        channel.basic_publish(exchange='heartbit', routing_key='', body='sl4 off')
        sw.switch_off_fourth()
        sl4flag = False


def callback(ch, method, properties, body):
    signal = body.decode("utf-8")
    light_management(signal)
    send_turn_on_pc_signal(signal)


# sched.start()

channel.basic_consume(callback, queue='switcher', no_ack=True)

channel.start_consuming()
