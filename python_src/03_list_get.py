import urllib.parse
import urllib.request
import json

def get_onedrive_list(access_token: str):

    url = "https://graph.microsoft.com/v1.0/me/drive/root/children"
    method = "GET"
    headers = {
        'Authorization': 'bearer ' + access_token
    }

    request = urllib.request.Request(url, method=method, headers=headers)
    with urllib.request.urlopen(request) as res:
        body = res.read()
        #print(body)
        dat = json.loads(body)
        #print(dat)
        if dat["value"]:
            list = dat["value"]
            for item in list:
                print(item)
                print("  ")

if __name__ == '__main__':

    access_token = "aaaaaaaaaaaaaaaaaa"
    get_onedrive_list(access_token)