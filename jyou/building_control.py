import requests
import json

from subprocess import check_output

ROOMSSID = {'UTLab_G':'A304',
            'DUCRB-LAB':'A204'}
AIRCON, FAN, LIGHT, ELEVATOR = 1, 2, 3, 4
devicekinds = {'AIRCON': 'airconditioner/',
               'FAN': 'ventilationunit/',
                'LIGHT':'light/elevator',
               'ELEVATOR':''}

APIURL = "http://172.26.16.8/api/ducrbcontrol/"

def get_sensorinfo_by_ucode():
    url = "http://172.26.16.8/api/00001C00000000000002000000063439/sensorstate/"
    req = requests.get(url)
    print(req.status_code)
    print(json.dumps(req.json(), ensure_ascii=False, indent=4))

def all_sensorinfo():
    url = "http://172.26.16.8/api/ALL/raspberrypi/sensorstate/"
    req = requests.get(url)
    print(req.status_code)
    print(json.dumps(req.json(), ensure_ascii=False, indent=4))

def get_airconinfo():
    # url = "http://172.26.16.8/api/ducrbcontrol/airconditioner/RoomName or ID/"
    url = "http://172.26.16.8/api/ducrbcontrol/airconditioner/a304/"
    req = requests.get(url, auth=('koshizukaLab', '8TxgS73KmG'))
    print(req.status_code)
    print(json.dumps(req.json(), ensure_ascii=False, indent=4))

def get_ventilation():
    url = "http://172.26.16.8/api/ducrbcontrol/ventilationunit/a304/"
    req = requests.get(url, auth=('koshizukaLab', '8TxgS73KmG'))
    print(req.status_code)
    print(json.dumps(req.json(), ensure_ascii=False, indent=4))

#↓↓↓↓↓統合↓↓↓↓
def get_deviceinfo(device, id):
    deviceurl = APIURL+devicekinds[device]+id
    req = requests.get(deviceurl, auth=('koshizukaLab', '8TxgS73KmG'))
    return req
    print(req.status_code)
    print(json.dumps(req.json(), ensure_ascii=False, indent=4))

def aircon_ctl():
    url = "http://172.26.16.8/api/ducrbcontrol/airconditioner/"

    headers = {
        "Content-Type": "application/json"}
    putdata = {
        'id': "a304",  # RoomName or Aircon ID
        'setting_bit': 0x01,
        'on_off': 1,
        'operation_mode': 4,
        'ventilation_mode': 0,
        'ventilation_amount': 0,
        'set_point': 25.0,
        'fan_speed': 2,
        'fan_direction': 7,
        'filter_sign_reset': 0
    }
    req = requests.put(url, data=json.dumps(putdata), headers=headers, auth=('koshizukaLab', '8TxgS73KmG'))
    print(req.status_code)

def ventilation_ctl():
    url = "http://172.26.16.8/api/ducrbcontrol/ventilationunit/"

    headers = {
        "Content-Type": "application/json"}
    putdata = {
        'id': "a304",  # RoomName or VentilationUnit ID
        'setting_bit': 0x01,
        'on_off': 1,
        'operation_mode': 32,
        'ventilation_mode': 4,
        'ventilation_amount': 4,
        'set_point': 0,
        'fan_speed': 0,
        'fan_direction': 0,
        'filter_sign_reset': 0
    }
    req = requests.put(url, data=json.dumps(putdata), headers=headers, auth=('koshizukaLab', '8TxgS73KmG'))
    print(req.status_code)

def get_roomname():
    wlan_cmd = 'iwconfig wlan0|grep ESSID'
    wlan_info = check_output(wlan_cmd, shell=True).decode().rstrip()
    idx = wlan_info.find('ESSID:')
    ssid = wlan_info[idx + 7:-1]
    return ROOMSSID[ssid]

def set_device(device, id, setting):
    deviceurl = APIURL+devicekinds[device]+id
    headers = {"Content-Type": "application/json"}
    putdata = {
        #todo
    }

    req = requests.put(deviceurl, data=json.dumps(putdata), headers=headers, auth=('koshizukaLab', '8TxgS73KmG'))
    print(req.status_code)

def set_device_on(device, setting=0):
    roomid = get_roomname()
    deviceurl = APIURL+devicekinds[device]
    headers = {"Content-Type": "application/json"}
    set_temp = 22.0
    putdata = {
        'id': roomid,  # RoomName
        'setting_bit': 0x11,
        'on_off': 1,
        'operation_mode': 4,
        'ventilation_mode': 0,
        'ventilation_amount': 0,
        'set_point': set_temp,
        'fan_speed': 2,
        'fan_direction': 7,
        'filter_sign_reset': 0
    }
    print(deviceurl)
    print(putdata)
    req = requests.put(deviceurl, data=json.dumps(putdata), headers=headers, auth=('koshizukaLab', '8TxgS73KmG'))
    print("set aircon on %s, stat: %s" %(set_temp, req.status_code))

def set_device_on_if_off(device, setting=0):
    roomid = get_roomname()
    device_info = get_deviceinfo(device, roomid)
    if device_info.json()[0]['on_off'] == 0:
        set_device_on(device)
