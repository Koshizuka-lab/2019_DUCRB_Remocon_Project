import RPi.GPIO as GPIO
import time

COLORRED, COLORGREEN, COLORYELLOW = 1, 2, 3
colors = [0xFF0000]
#colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF]
pins = {'pin_R': 25, 'pin_G': 8, 'pin_B': 7}  # pins is a dict
GPIO.setmode(GPIO.BCM)  # Numbers GPIOs by physical location
for i in pins:
    GPIO.setup(pins[i], GPIO.OUT)  # Set pins' mode is output
    GPIO.output(pins[i], GPIO.HIGH)  # Set pins to high(+3.3V) to off led
p_R = GPIO.PWM(pins['pin_R'], 2000)  # set Frequece to 2KHz
p_G = GPIO.PWM(pins['pin_G'], 2000)
p_B = GPIO.PWM(pins['pin_B'], 5000)
p_R.start(0)  # Initial duty Cycle = 0(leds off)
p_G.start(0)
p_B.start(0)

def map(x, in_min, in_max, out_min, out_max):
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min


def setColor2(color):
    if color == COLORRED:
        print("set color red")
        p_R.ChangeDutyCycle(100)
        p_G.ChangeDutyCycle(0)
        p_B.ChangeDutyCycle(0)
    elif color == COLORYELLOW:
        print("set color yellow")
        p_R.ChangeDutyCycle(100)
        p_G.ChangeDutyCycle(100)
        p_B.ChangeDutyCycle(0)
    elif color == COLORGREEN:
        print("set color green")
        p_R.ChangeDutyCycle(0)
        p_G.ChangeDutyCycle(100)
        p_B.ChangeDutyCycle(0)


def setColor(col):  # For example : col = 0x112233
    R_val = (col & 0x110000) >> 16
    G_val = (col & 0x001100) >> 8
    B_val = (col & 0x000011) >> 0
    R_val = map(R_val, 0, 255, 0, 100)
    G_val = map(G_val, 0, 255, 0, 100)
    B_val = map(B_val, 0, 255, 0, 100)
    p_R.ChangeDutyCycle(R_val)  # Change duty cycle
    p_G.ChangeDutyCycle(G_val)
    p_B.ChangeDutyCycle(B_val)

if __name__ == '__main__':
    try:
        while True:
            for col in colors:
                setColor(col)
                time.sleep(0.5)

    except KeyboardInterrupt:
        p_R.stop()
        p_G.stop()
        p_B.stop()
        for i in pins:
            GPIO.output(pins[i], GPIO.HIGH)  # Turn off all leds
        GPIO.cleanup()