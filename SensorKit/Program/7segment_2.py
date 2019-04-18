import os
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)


nowtime = 'date +%H%M'  #これは分:秒なので時:分にするときは%M%Sを%H%Mにすればよい

digit = 0   #表示する桁のカウント（0～3)

#アノード
d1 = 22
d2 = 27
d3 = 17
d4 = 24

digitGPIO = [22, 27, 17, 24]
GPIO.setup(digitGPIO, GPIO.OUT)

#カソード
n0 = [18]
n1 = [11, 10 ,7 ,8 ,18]
n2 = [10, 23]
n3 = [10 ,7]
n4 = [11, 7 ,8]
n5 = [4, 7]
n6 = [4]
n7 = [10, 18, 7, 8]
n8 = []
n9 = [7]

numGPIO = [11, 10, 8, 7, 23, 18, 4]
GPIO.setup(numGPIO, GPIO.OUT)


GPIO.output(digitGPIO, 0)
GPIO.output(numGPIO, 0)

try:
	while True:
		nowtimeB = os.popen(nowtime).readline().strip()     #nowtimeをいい感じに整える
		numlist = [ int(num) for num in list(str(nowtimeB))]    #nowtimeBを一桁ずつ配列にする　ex)1234 -> 1,2,3,4

        #次の桁を表示する前にすべて消灯する
		GPIO.output(digitGPIO, 0)
		GPIO.output(numGPIO, 0)


        #numlistから次の桁をdigitをインデックスに取り出し対応するセグメントを点灯
		if numlist[digit] == 0:
			GPIO.output(digitGPIO[digit], 1)
			GPIO.output(n0,1)

		elif numlist[digit] == 1:
			GPIO.output(digitGPIO[digit], 1)
			GPIO.output(n1,1)
            			
		elif numlist[digit] == 2:
			GPIO.output(digitGPIO[digit], 1)
			GPIO.output(n2,1)

		elif numlist[digit] == 3:
			GPIO.output(digitGPIO[digit], 1)
			GPIO.output(n3,1)

		elif numlist[digit] == 4:
			GPIO.output(digitGPIO[digit], 1)
			GPIO.output(n4,1)

		elif numlist[digit] == 5:
			GPIO.output(digitGPIO[digit], 1)
			GPIO.output(n5,1)

		elif numlist[digit] == 6:
			GPIO.output(digitGPIO[digit], 1)
			GPIO.output(n6,1)

		elif numlist[digit] == 7:
			GPIO.output(digitGPIO[digit], 1)
			GPIO.output(n7,1)

		elif numlist[digit] == 8:
			GPIO.output(digitGPIO[digit], 1)
			GPIO.output(n8,1)

		elif numlist[digit] == 9:
			GPIO.output(digitGPIO[digit], 1)
			GPIO.output(n9,1)

        #digitを0～3でサイクルさせる
		if digit == 3:
			digit = 0
		else:
			digit = digit + 1

        #次の桁を表示するまでの時間(数値はお好みで)
		time.sleep(0.001)

finally:
	GPIO.cleanup()

