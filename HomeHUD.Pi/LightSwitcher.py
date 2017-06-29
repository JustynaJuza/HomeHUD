from pprint import pprint


class LightSwitcher(object):

    def __init__(self):
        self._url = CONNECTION_URI

    def connect(self):



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