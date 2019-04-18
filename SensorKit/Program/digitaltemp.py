#!/usr/bin/env python
import RPi.GPIO as GPIO
import time

TempPin = 18

def init():
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(TempPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

def loop():
    while True:
        pass
    
if __name__== '__main__':
    init()
    try:
        loop()
    except KeyboardInterrupt:
        print('The end!')
