import { Component, OnInit } from '@angular/core';

import { CommonService } from '../common.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    public commonService:CommonService,
  ) { }

  infoList = [];

  ngOnInit(): void {
    this.commonService.createFileInfoList();
  }

  buttonClick(){
    this.commonService.func01();
  }

}

