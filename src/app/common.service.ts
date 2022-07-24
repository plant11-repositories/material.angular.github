import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
  ) { }

  func01(){
    console.log("func01");
  }

  public fileInfoList = [];

  createFileInfoList(){

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });

    let options = {
      headers: httpHeaders,
    };

    let url = "https://2amupi7c0h.execute-api.ap-northeast-1.amazonaws.com/v1";

    this.http.get<any>(url, options).subscribe({
      next:(data) => {
        console.log("OK");
        console.log(data);

        this.fileInfoList = data;

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

