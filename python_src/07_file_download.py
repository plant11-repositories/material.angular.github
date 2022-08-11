import urllib.parse
import urllib.request
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


def download_file(access_token: str, item_id:str):

    url = "https://graph.microsoft.com/v1.0/me/drive/items/" + urllib.parse.quote(item_id)

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
        item_name = dat["name"]
        #download_file_content(access_token,item_id,item_name)
        print("item_name:" + item_name)
        
        download_url = dat["@microsoft.graph.downloadUrl"]
        print("download_url:" + download_url)
        
        save_name = "c:/tmp/" + item_name
        urllib.request.urlretrieve(download_url, save_name)        
        

if __name__ == '__main__':

    access_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaa"
    item_id = "C13574531B2FCC89!20013"

    download_file(access_token,item_id)