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
    console.log("test");
    this.showLoading("loading");
    setTimeout(() => {
      this.hideLoading();
      console.log("test2222");
    }, 1000);
  }

  showLoading(strMessage: string):void {
    //処理中の画面を表示させます
    this.loadingService.setLoading(strMessage);
 }

 hideLoading():void {
    //処理中の画面を消します
    this.loadingService.setLoading("");
 }
}
