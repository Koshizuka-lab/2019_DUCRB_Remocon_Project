#!/usr/bin/env python
import RPi.GPIO as GPIO
import ADC0832
import time

LedPin = 36

def init():
        ADC0832.setup()
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(LedPin, GPIO.OUT)
        GPIO.output(LedPin, GPIO.LOW)

def loop():
        while True:
                res = ADC0832.getResult() - 80
                GPIO.output(LedPin, GPIO.LOW)
                if res < 0:
                        res = 0
                if res > 100:
                        res = 100
                        GPIO.output(LedPin, GPIO.HIGH)
                print('res = %d' % res)
                time.sleep(0.2)

if __name__ == '__main__':
        init()
        try:
                loop()
        except KeyboardInterrupt: 
                ADC0832.destroy()
                GPIO.output(LedPin, GPIO.LOW)
                GPIO.cleanup()
                print('The end !')
