#!/usr/bin/env python

import sys
import time
import RPi.GPIO as GPIO
from time import sleep

SENSOR_PORT=17
LED_PORT=18
DELAY=1

def led_init():
  GPIO.setmode(GPIO.BCM)
  GPIO.setup(SENSOR_PORT, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
  GPIO.setup(LED_PORT, GPIO.OUT)

def led_deinit():
  GPIO.cleanup()

def led_indicator():
  try:
    led_init()
    print("Start led_indicator")
  except:
    print("exception occurred")
    return 1
  else:
    while True:
      if GPIO.input(SENSOR_PORT):
        GPIO.output(LED_PORT, GPIO.HIGH)
      else:
        GPIO.output(LED_PORT, GPIO.LOW)
      sleep(DELAY)
  finally:
    print("Finaly")
    led_deinit()

if __name__ == '__main__':
#  sys.exit(led_indicator())
  led_indicator()
