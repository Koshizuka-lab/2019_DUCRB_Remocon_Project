import sys
import RPi.GPIO as GPIO
import time

INTERVAL = 0.001

#--------------------------------------------
# get now time
#--------------------------------------------
def getTime():
    # now time
    n = time.strftime('%I') + time.strftime('%M')
    timeList = list(n)
#    print("timeList: " + str(timeList))
    return timeList

#--------------------------------------------
# set AM/PM LED
#--------------------------------------------
def setAmPm():
    # get AM/PM
    ap = time.strftime('%p')
    # print(str(ap))
    #if ap == "AM":
        #turnLight(20,1)
        #turnLight(21,0)
    #else:
        #turnLight(20,0)
        #turnLight(21,1)

#--------------------------------------------
# switch 7seg LED light
#--------------------------------------------
def switchLight(gpio, number):
    GPIO.setup(gpio, GPIO.OUT)
    if number == 0:
        GPIO.output(gpio, GPIO.HIGH)
    else:
        GPIO.output(gpio, GPIO.LOW)

#--------------------------------------------
# set lighting LED number
#--------------------------------------------
def lightNumber(number, cnt):
    # GPIO ports for the 7seg pins
    segments =  (11,4,23,8,7,10,18,25)

    # Number light pattern
    num = {' ':(0,0,0,0,0,0,0),
        '0':(1,1,1,1,1,1,0),
        '1':(0,1,1,0,0,0,0),
        '2':(1,1,0,1,1,0,1),
        '3':(1,1,1,1,0,0,1),
        '4':(0,1,1,0,0,1,1),
        '5':(1,0,1,1,0,1,1),
        '6':(1,0,1,1,1,1,1),
        '7':(1,1,1,0,0,0,0),
        '8':(1,1,1,1,1,1,1),
        '9':(1,1,1,1,0,1,1)}

    # GPIO ports for the digit 0-3 pins
    digits = (22,27,17,24)

    for i in range(0,7):
#        print(str(segments[i]) + "," + str(num[number][i]))
        switchLight(segments[i],num[number][i])

    switchLight(digits[cnt-1],1)
    switchLight(digits[cnt],0)

#--------------------------------------------
# main
#--------------------------------------------
GPIO.setmode(GPIO.BCM)
try:
    # display to time number
    while True:
        # now time
        lst = getTime()

        # set AM/PM
        setAmPm()

        # counter reset
        count = 0

        # set display numbers
        for nm in lst:
            lightNumber(nm, count)
            count+=1
            time.sleep(INTERVAL)
finally:
    GPIO.cleanup()
