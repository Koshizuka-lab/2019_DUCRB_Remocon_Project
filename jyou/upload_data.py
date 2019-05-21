import httplib2
import numpy as np
from time import sleep
import datetime

from apiclient import discovery
from oauth2client.service_account import ServiceAccountCredentials

SCOPES = 'https://www.googleapis.com/auth/spreadsheets'
APPEND_RANGE = 'sheet1!A1:E1'

class SpreadSheet(object):
  def __init__(self, sheet_id):
    self.sheetId = sheet_id

    credentials = ServiceAccountCredentials.from_json_keyfile_name('ForRespi-3f3ed6e88e10.json', scopes=SCOPES)
    http_auth = credentials.authorize(httplib2.Http())
    discoveryUrl = ('https://sheets.googleapis.com/$discovery/rest?''version=v4')
    self.service = discovery.build('sheets', 'v4', http=http_auth, discoveryServiceUrl=discoveryUrl)

  def append(self, values):
    assert np.array(values).shape==(5,) , "The shape of value %s must be 5" % (np.array(values).shape)

    value_range_body = {'values':[values]}
    result = self.service.spreadsheets().values().append(
        spreadsheetId=self.sheetId,
        range=APPEND_RANGE,
        valueInputOption='RAW',
        body=value_range_body
    ).execute()
    #print(result)

def upload_data(water, temperature=0, humidity=0):
    sheet = SpreadSheet("1_inDg4xnUvgxzr5A8pT5x8EvhPSxeWCTgsKGyWfRjmw")
    date = datetime.datetime.now().strftime("%Y/%m/%d")
    time = datetime.datetime.now().strftime("%H:%M:%S")
    sheet.append([date, time, temperature, humidity, water])

if __name__ == '__main__':
  sheet = SpreadSheet("1_inDg4xnUvgxzr5A8pT5x8EvhPSxeWCTgsKGyWfRjmw")
  sheet.append(["fujii"])