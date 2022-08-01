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
  }

  buttonClick(){
    this.commonService.func01();
  }

  oneDriveConnect(){
    console.log("oneDriveConnect clicked");
    //const target_url = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=ad09f3e6-f94d-483b-b1a3-3bc5fa0d7b1a&scope=offline_access%20files.readwrite.all&response_type=code&redirect_uri=https%3A%2F%2Fmedia.plant11.com%2F";
    //const target_url = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4e55f9b5-c3e4-476f-96a9-1c002b84f90a&scope=offline_access%20files.readwrite.all&response_type=code&redirect_uri=http://localhost:4200/";
    const target_url = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?"
    + "client_id=4e55f9b5-c3e4-476f-96a9-1c002b84f90a"
    + "&scope=offline_access%20files.readwrite.all"
    + "&response_type=code"
    + "&redirect_uri=http://localhost:4200/";

    console.log("url:" + target_url);
    
    location.href=target_url;
  }
}
