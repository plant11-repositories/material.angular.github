import { Component, OnInit } from '@angular/core';

import { CommonService } from '../common.service';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private commonService:CommonService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.commonService.cognitoAuth();
  }

  buttonClick(){
    this.commonService.func01();
  }

  button02Click(){

    let access_token = this.commonService.getToken();
    //console.log("acc_token:" + access_token);

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : access_token,
    });
    let get_params = new HttpParams()
      .set("param1","aaa");

    let options = {
      headers: httpHeaders,
      params: get_params,
    };
    const url = "https://wopjjaloe9.execute-api.ap-southeast-1.amazonaws.com/v1";

    this.http.get<any>(url, options).subscribe({
      next:(data) => {
        console.log("OK");
        console.log(data);
      },
      error:(e) =>{
        console.log("NG");
        console.error(e);
      },
      complete: () => {
        console.log("complete");
      }
    })

  }

}
