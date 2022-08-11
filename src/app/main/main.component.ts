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

  oneDriveConnect(){
    console.log("oneDriveConnect clicked");
    const target_url = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" 
    + "client_id=4e55f9b5-c3e4-476f-96a9-1c002b84f90a"
    + "&scope=offline_access%20files.readwrite.all"
    + "&response_type=code"
    + "&redirect_uri=http://localhost:4200/";

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
