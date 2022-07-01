import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Buffer } from 'buffer'


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
  ) { }

  func01(){
    location.href="https://user-pool-example01-for-github-public.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=48kieim2ji4v03l7g005khk7ft&redirect_uri=http://localhost:4200/&state=STATE&scope=openid+email";
  }

  getParamValue(key: string){
    let ret_value = "";
    if(location.search.substring(1) != ""){
        var pair = location.search.substring(1).split('&');
        for(var i=0;pair[i];i++) {
            var kv = pair[i].split('=');
            if(kv[0] == key){
                //ret_value = decodeURIComponent(kv[1]).replace(/\+/g," ");
                ret_value = kv[1];
                break;
            }
        }
    }
    return ret_value;
  }

  cognitoAuth(){
    let code = this.getParamValue("code");
    console.log("code:" + code);
    // "xxxxxx1"にはクライアントID を指定
    // "xxxxxx2"にはクライアントシークレット を指定
    if(code){
      let auth_code_base64 = Buffer.from('48kieim2ji4v03l7g005khk7ft:113rdbl789f4mcf7vhoeghfq1uj4t3pk0gkd82a3nlb86lnn03fq').toString('base64');
      console.log("auth_code_base64:" + auth_code_base64);
      let httpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + auth_code_base64,
      'Content-Type' : 'application/x-www-form-urlencoded',
      });

      let options = {
        headers: httpHeaders,
      };

      const postParam = new HttpParams()
        .set("grant_type","authorization_code")
        .set("client_id","48kieim2ji4v03l7g005khk7ft")
        .set("code",code)
        .set("redirect_uri","http://localhost:4200/")

      const url = "https://user-pool-example01-for-github-public.auth.ap-southeast-1.amazoncognito.com/oauth2/token";

      this.http.post<any>(url, postParam, options).subscribe({
        next:(data) => {
          console.log("ok");
          console.log(data);
          let id_token = data["id_token"];
          console.log("id_token:" + id_token);
        },
        error:(e) =>{
          console.log("ng");
          console.error(e);
        },
        complete: () => {
          console.log("complete");
        }
      })

    }
  }


}
