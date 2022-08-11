import { Component, OnInit } from '@angular/core';

import { CommonService } from '../common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private commonService:CommonService,
  ) { }

  ngOnInit(): void {

    let code = this.get_param_value("code");
    if(code){
      console.log("code:" + code);
    }

  }

  buttonClick(){
    this.commonService.func01();
  }

  googleDriveConnect(){
    console.log("oneDriveConnect clicked");
    const target_url = "https://accounts.google.com/o/oauth2/v2/auth?"
    + "scope=https%3A//www.googleapis.com/auth/drive"
    + "&access_type=offline"
    + "&response_type=code"
    + "&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F"
    + "&client_id=476397424039-igtlmcnfd6gcp9k4jdfc5ou74pego62j.apps.googleusercontent.com";

    location.href=target_url;
  }


  get_param_value(key: string){
    let ret_value = "";
    if(location.search.substring(1) != ""){
        var pair = location.search.substring(1).split('&');
        for(var i=0;pair[i];i++) {
            var kv = pair[i].split('=');
            if(kv[0] == key){
                ret_value = decodeURIComponent(kv[1]).replace(/\+/g," ");
                break;
            }
        }
    }
    return ret_value;
  }


}
