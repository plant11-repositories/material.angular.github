import urllib.parse
import urllib.request
import urllib
import json

def download_file_content(access_token: str, item_id:str, item_name:str):
    url = "https://graph.microsoft.com/v1.0/me/drive/items/" + urllib.parse.quote(item_id) + "/content"

    method = "GET"
    headers = {
        'Authorization': 'bearer ' + access_token
    }

    request = urllib.request.Request(url, method=method, headers=headers)
    with urllib.request.urlopen(request) as res:
        print(res)
        #body = res.read()
        #print(body)
        #dat = json.loads(body)
        #print(dat)

def download_file_content(access_token: str, item_id:str, file_name:str):

    url = "https://www.googleapis.com/drive/v3/files/" + urllib.parse.quote(item_id)

    method = "GET"
    headers = {
        'Authorization': 'Bearer ' + access_token
    }

    params = {
        "alt":"media"
      }

    param_str = urllib.parse.urlencode(params)
    print(param_str)
    url = url + "?" + param_str

    request = urllib.request.Request(url, method=method, headers=headers)
    with urllib.request.urlopen(request) as res:
        body = res.read()
        save_name = "c:/tmp/" + file_name
        with open(save_name, mode="wb") as f:
          f.write(body)


def download_file(access_token: str, item_id:str):

    url = "https://www.googleapis.com/drive/v3/files/" + urllib.parse.quote(item_id)

    method = "GET"
    headers = {
        'Authorization': 'Bearer ' + access_token
    }

    params = {
        "fields": "id,name,webContentLink",
        #"fields": "*",
      }

    param_str = urllib.parse.urlencode(params)
    print(param_str)
    url = url + "?" + param_str

    request = urllib.request.Request(url, method=method, headers=headers)
    with urllib.request.urlopen(request) as res:
        body = res.read()

        dat = json.loads(body)
        print(dat)

        file_name = dat["name"]

        print("file_name:"+ file_name)

        download_file_content(access_token,item_id,file_name)

if __name__ == '__main__':

    access_token = "aaaaaaaaaaaaaaaaaaaaaaa"
    item_id = "1pEdB0uxoddmfgeSv_F-p72BD1Pq8cuXD"

    download_file(access_token,item_id)
