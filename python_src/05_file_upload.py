import pathlib
import urllib.parse
import urllib.request
import json
import os

def upload_file_session(access_token: str, upload_url:str, target_file:pathlib.Path):

    contentLength = os.path.getsize(target_file)
    print("contentLength:" + str(contentLength))

    with open(target_file, 'rb') as f:

        file_split_size = 1024 * 1024 * 10

        current_pos = 0

        while current_pos < contentLength:

            remain = contentLength - current_pos
            next_size = file_split_size
            if remain <= file_split_size:
                next_size = remain

            file_body = f.read(next_size)

            reange_string = "bytes " + str(current_pos) + "-" + str(current_pos + next_size -1) + "/" + str(contentLength)
            print(reange_string)

            method = "PUT"
            headers = {
                'Content-Type': 'application/octet-stream'
                ,'Authorization': "Bearer " + access_token
                ,'Content-Length': next_size
                ,'Content-Range': reange_string
            }

            request = urllib.request.Request(upload_url, data=file_body, method=method, headers=headers)
            with urllib.request.urlopen(request) as res:
                body = res.read()
                print(body)

            current_pos = current_pos + next_size



def upload_file(access_token: str, parent_id: str, target_file:pathlib.Path):

    url = "https://graph.microsoft.com/v1.0/me/drive/items/" + urllib.parse.quote(parent_id) + ":/"+ urllib.parse.quote(target_file.name) + ":/createUploadSession"
    #print(url)
    method = "POST"
    headers = {
        'Content-Type': 'application/json'
        ,'Authorization': 'bearer ' + access_token
    }

    params = {
        "item": {
            "@odata.type": "microsoft.graph.driveItemUploadableProperties",
            "@microsoft.graph.conflictBehavior": "replace",
            "name": target_file.name
        }
      }

    encoded_param = json.dumps(params).encode("utf-8")

    request = urllib.request.Request(url, data=encoded_param, method=method, headers=headers)

    with urllib.request.urlopen(request) as res:
        body = res.read()
        #print(body)
        dat = json.loads(body)
        #print(dat)
        upload_url = dat["uploadUrl"]
        print(upload_url)
        
        upload_file_session(access_token,upload_url,target_file)


if __name__ == '__main__':

    access_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    parent_id = "bbbbbbbbbbbbbbbb"
    target_file = pathlib.Path("c:/tmp/テスト.docx")
    
    upload_file(access_token,parent_id,target_file)
    
    