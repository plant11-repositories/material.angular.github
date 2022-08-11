import urllib.parse
import urllib.request
import json

def get_googledrive_item(access_token: str, id: str):

    url = "https://www.googleapis.com/drive/v3/files/" + id
    method = "GET"
    headers = {
        'Authorization': 'Bearer ' + access_token
    }

    request = urllib.request.Request(url, method=method, headers=headers)
    with urllib.request.urlopen(request) as res:
        body = res.read()
        dat = json.loads(body)
        print(dat)


def get_googledrive_list(access_token: str):

    url = "https://www.googleapis.com/drive/v2/files/root/children"
    method = "GET"
    headers = {
        'Authorization': 'Bearer ' + access_token
    }

    request = urllib.request.Request(url, method=method, headers=headers)
    with urllib.request.urlopen(request) as res:
        body = res.read()
        #print(body)
        dat = json.loads(body)
        print(dat)
        if dat["items"]:
            list = dat["items"]
            for item in list:
                id = item["id"]
                print(id)
                get_googledrive_item(access_token,id)
                print("  ")


if __name__ == '__main__':

    access_token = "aaaaaaaaaaaaaaaaaaaaaaaaa"
    get_googledrive_list(access_token)
