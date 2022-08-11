import urllib.parse
import urllib.request
import json

def get_onedrive_list(access_token: str, parent_id:str):

    url = "https://graph.microsoft.com/v1.0/me/drive/items/" + urllib.parse.quote(parent_id) + "/children"

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

    access_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    parent_id = "bbbbbbbbbbbbb"

    get_onedrive_list(access_token,parent_id)