# -*- coding: UTF-8 -*
from urllib import request
import json
import jsonpath

def get_jsondata():
    url = 'https://api.darksky.net/forecast/''fb2de4b0a2207f426e6632d973e8dc55''/36.0658,139.5221?units=si&lang=ja&exclude=alerts,flags'
    header = {'Accept-Charset': 'UTF-8'}
    data = None
    rq = request.Request(url, data=data, headers=header)
    response = request.urlopen(rq)
    # 取出json文件里的内容，返回的格式是字符串
    html = response.read()
    # 把json形式的字符串转换成python形式的Unicode字符串
    unicodestr = json.loads(html)
    return unicodestr
'''
    hourly_time = unicodestr['hourly']['data'][35]['time']
    rain_prob = unicodestr['hourly']['data'][]['precipProbability']
    temperature = unicodestr['hourly']['data'][]['temperature']
'''

def send_weather_info():
    print("todo")

if __name__ == '__main__':
    get_jsondata()
