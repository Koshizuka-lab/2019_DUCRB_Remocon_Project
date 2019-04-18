import time      #importing the time module
import os     #importing the os module
import RPi.GPIO as GPIO       #importing the RPi.GPIO module
GPIO.cleanup()      #clean up at the end of your script
GPIO.setmode(GPIO.BCM)    #to specify whilch pin numbering system

#read SPI data from MCP3008(or MCP3204) chip,8 possible adc's (0 thru 7)
def readadc(adcnum, clockpin, mosipin, misopin, cspin):
        if ((adcnum > 7) or (adcnum < 0)):
                return -1
        GPIO.output(cspin, True)  

        GPIO.output(clockpin, False)  # start clock low
        GPIO.output(cspin, False)     # bring CS low

        commandout = adcnum
        commandout |= 0x18  # start bit + single-ended bit
        commandout <<= 3    # we only need to send 5 bits here
        for i in range(5):
                if (commandout & 0x80):
                        GPIO.output(mosipin, True)
                else:
                        GPIO.output(mosipin, False)
                commandout <<= 1
                GPIO.output(clockpin, True)
                GPIO.output(clockpin, False)

        adcout = 0
        # read in one empty bit, one null bit and 10 ADC bits
        for i in range(12):
                GPIO.output(clockpin, True)
                GPIO.output(clockpin, False)
                adcout <<= 1
                if (GPIO.input(misopin)):
                        adcout |= 0x1

        GPIO.output(cspin, True)
        
        adcout >>= 1       # first bit is 'null' so drop it
        return adcout

# change these as desired - they're the pins connected from the
# SPI port on the ADC to the Cobbler
SPICLK = 11
SPIMISO = 9
SPIMOSI = 10
SPICS = 8

# set up the SPI interface pins
GPIO.setup(SPIMOSI, GPIO.OUT)
GPIO.setup(SPIMISO, GPIO.IN)
GPIO.setup(SPICLK, GPIO.OUT)
GPIO.setup(SPICS, GPIO.OUT)

#relay port to the cobbler
Relay_pin = 26

#set up the relay port
GPIO.setup(Relay_pin,GPIO.OUT)
 
#disable the gpio warning information
GPIO.setwarnings(False)

# photoresistor connected to adc #0
photo_ch = 0;

#last_read = 0       # this keeps track of the last potentiometer value
#tolerance = 5       # to keep from being jittery we'll only change
                    # volume when the pot has moved more than 5 'counts'
print("______________________________________________________________________")
while True:
  photo_value = readadc(photo_ch, SPICLK, SPIMOSI, SPIMISO, SPICS)
  if(photo_value<=700):
    print("It`s dark,turn on the light")
    GPIO.output(Relay_pin,True)
  else:
    print("dawn,turn off the light")
    GPIO.output(Relay_pin,False)

  print("photo_value=%d" % photo_value)
  time.sleep(0.5)

#GPIO.cleanup()
