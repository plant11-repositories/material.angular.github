import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-spinner-sample',
  templateUrl: './spinner-sample.component.html',
  styleUrls: ['./spinner-sample.component.css']
})
export class SpinnerSampleComponent implements OnInit {

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  button_click(){
    this.showLoading("loading");
    setTimeout(() => {
      this.hideLoading();
    }, 2000);
  }

  showLoading(strMessage: string):void {
    this.loadingService.setLoading(strMessage);
 }

 hideLoading():void {
    this.loadingService.setLoading("");
 }
}
