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
    const target_url = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" 
    + "client_id=4e55f9b5-c3e4-476f-96a9-1c002b84f90a"
    + "&scope=offline_access%20files.readwrite.all"
    + "&response_type=code"
    + "&redirect_uri=http://localhost:4200/";

    location.href=target_url;
  }
}
