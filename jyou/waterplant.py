import RPi.GPIO as GPIO
import urllib, json
import time
from watersensorMCP3008 import readWaterLine
from rgb import setColor2
from send_slackmsg import send_slack_msg
from buzzer_passive import playsong
from temperature_humidity import read_dht11_dat
from upload_data import upload_data
from building_control import set_device_on_if_off
from get_weather import send_weather_info

COLORRED, COLORGREEN, COLORYELLOW = 1, 2, 3

def main():
    print("Welcome to SmartPlantSystem\n")
    #detect water in loop
    ori_water = 0
    while True:
        send_weather_info()
        #read temperature
        read_data = read_dht11_dat()
        if read_data:
            humidity, temperature = read_data
            print("humidity: %s %%,  Temperature: %s C`" % (humidity, temperature))
            if temperature > 25:
                set_device_on_if_off('AIRCON')
        #read temperature
        water_line = readWaterLine()
        #upload sensing data
        if water_line and read_data:
            print('water: %s %%' % (water_line * 100.0))
            upload_data(water_line, temperature, humidity)
            #save in log file
            #when water>70%, desplay green
            if water_line >= 0.7:
                setColor2(COLORGREEN)
            #when 30%<water<70%, desplay yellow
            elif water_line >= 0.3 and water_line< 0.7:
                setColor2(COLORYELLOW)
            #when water<30%, desplay red and send warning msg to slack
            elif water_line < 0.3:
                setColor2(COLORRED)
                slack_msg = "[SOS]Water:%s %%" % (water_line*100.0)
                send_slack_msg(slack_msg)
            #after giving water, play song for 10s
            if (water_line - ori_water) > 0.3:
                slack_msg = "Thank you"
                send_slack_msg(slack_msg)
                playsong()
            ori_water = water_line
        time.sleep(1)

def destroy():
    GPIO.cleanup()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        destroy()
