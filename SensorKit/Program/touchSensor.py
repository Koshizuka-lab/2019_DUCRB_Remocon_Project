#!/usr/bin/env python
import RPi.GPIO as GPIO

TouchPin = 11
Rpin   = 12
Gpin   = 13
Bpin   = 15
Buzzer = 16

tmp = 0

def setup():
    GPIO.setmode(GPIO.BOARD)       # Numbers GPIOs by physical location
    GPIO.setup(Gpin, GPIO.OUT)     # Set Green Led Pin mode to output
    GPIO.setup(Rpin, GPIO.OUT)     # Set Red Led Pin mode to output
    GPIO.setup(Bpin, GPIO.OUT)
    GPIO.setup(Buzzer, GPIO.OUT)
    GPIO.setup(TouchPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)    # Set BtnPin's mode is input, and pull up to high level(3.3V)

def Led(x):
    if x == 0:
        GPIO.output(Rpin, 0)
        GPIO.output(Gpin, 0)
        GPIO.output(Bpin, 0)
    if x == 1:
        GPIO.output(Rpin, 1)
        GPIO.output(Gpin, 1)
        GPIO.output(Bpin, 1)


def Print(x):
    global tmp
    if x != tmp:
        if x == 1:
            print('    **********')
            print('    *     ON *')
            print('    **********')
            GPIO.output(Buzzer, 1)

        if x == 0:
            print('    **********')
            print('    * OFF    *')
            print('    **********')
            GPIO.output(Buzzer, 0)

        tmp = x

def loop():
    while True:
        Led(GPIO.input(TouchPin))
        Print(GPIO.input(TouchPin))

def destroy():
    GPIO.output(Gpin, GPIO.HIGH)       # Green led off
    GPIO.output(Rpin, GPIO.HIGH)       # Red led off
    GPIO.output(Bpin, GPIO.HIGH)
    GPIO.output(Buzzer, GPIO.HIGH)
    GPIO.cleanup()                     # Release resource

if __name__ == '__main__':     # Program start from here
    setup()
    try:
        loop()
    except KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the child program destroy() will be  executed.
        destroy()
