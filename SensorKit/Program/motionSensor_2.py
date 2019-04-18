import sys
import time
import RPi.GPIO as GPIO

SLEEP_TIME = 1
SENSOR_GPIO = 17

GPIO.cleanup()
GPIO.setmode(GPIO.BCM)
GPIO.setup(SENSOR_GPIO, GPIO.IN)

while True:
  if GPIO.input(SENSOR_GPIO) == GPIO.HIGH:
    print("move")
  else:
    print("don't move")

  time.sleep(SLEEP_TIME)

