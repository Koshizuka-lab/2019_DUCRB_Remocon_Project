import urllib.request, json

url = "https://hooks.slack.com/services/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"
method = "POST"
headers = {"Content-Type" : "application/json"}

def send_slack_msg(msg):
    test_data = {'text':msg}
    json_data = json.dumps(test_data).encode("utf-8")
    request = urllib.request.Request(url, data=json_data, method=method, headers=headers)
    with urllib.request.urlopen(request) as response:
        response_body = response.read().decode("utf-8")
    print("send message to qing")