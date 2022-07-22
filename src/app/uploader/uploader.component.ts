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
      this.fileName = "Select File                           ";
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";
    alert("upload!!!");
  }
}
