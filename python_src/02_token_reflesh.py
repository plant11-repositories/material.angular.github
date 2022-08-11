import urllib.parse
import urllib.request
import json

def get_googledrive_reflesh_token(refresh_token: str):

    apl_client_id= "*********************************"
    client_secret = "********************************"
    redirect_url = "http://localhost:4200/"

    url = "https://oauth2.googleapis.com/token"
    method = "POST"
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    params = {
        "client_id": apl_client_id
        ,"redirect_uri": redirect_url
        ,"client_secret": client_secret
        ,"refresh_token": refresh_token
        ,"grant_type": "refresh_token"
    }

    encoded_param = urllib.parse.urlencode(params).encode()

    request = urllib.request.Request(url, data=encoded_param, method=method, headers=headers)
    with urllib.request.urlopen(request) as res:
        body = res.read()
        print(body)
        dat = json.loads(body)
        print(dat)
        #print("refresh_token:" + dat["refresh_token"])
        print("access_token:" + dat["access_token"])

if __name__ == '__main__':

    refresh_token = "aaaaaaaaaaaaaaaaaa"
    get_googledrive_reflesh_token(refresh_token)
