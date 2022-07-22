import { Component, ElementRef, OnInit, ViewChild,Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  currentFile?: File;
  progress = 0;
  message = '';
  fd? : FormData;

  fileName = 'Select File';
  fileInfos?: Observable<any>;

  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    ) {
      this.matIconRegistry.addSvgIcon(
        'file_upload',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/file_upload_black_24dp.svg'));
    }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
      this.fd = new FormData();
      this.fd.append("upfile",this.currentFile);
      //this.fddd: FormData = new FormData();
    } else {
      this.fileName = "Select File";
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";
    //alert("upload!!!");

    let file_name : string = String(this.currentFile?.name);
    console.log("file_name:" + file_name);

    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });

    const options = {
      headers: httpHeaders,
      params: {"file_name":file_name},
      reportProgress: false,
    };

    const url = "https://nwdnxu7pak.execute-api.ap-northeast-1.amazonaws.com/v1";

    this.http.get<any>(url, options).subscribe({
      next:(data) => {
        console.log("OK");
        console.log(data);
        let upload_url = data;
        console.log("upload_url:" + upload_url);

        this.upload_s3(upload_url);

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

  upload_s3(uploadUrl:string){

    this.http.put<any>(uploadUrl,this.fd
      ,{reportProgress: true,observe: "events"}).subscribe({
      next:(event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log(event);
          //console.log(event.body.message);
          //this.fileInfos = this.uploadService.getFiles();
        }

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
