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
    location.href="https://user-pool-example01-for-github-public.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=48kieim2ji4v03l7g005khk7ft&redirect_uri=http://localhost:4200/&state=STATE&scope=openid+email";
  }

}
