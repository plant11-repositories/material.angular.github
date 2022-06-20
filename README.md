# Angular Material ProgressSpinner 導入

## Node.js インストール
https://angular.io/guide/setup-local  
https://nodejs.org/en/download/  
![image](https://user-images.githubusercontent.com/38905609/174221507-415108dd-d73a-497a-aef4-ebc27dd99e27.png)
![image](https://user-images.githubusercontent.com/38905609/174221619-1cf64e4b-97d4-4d72-99e5-0dcee2c20a60.png)


## Angular インストール
https://angular.io/guide/setup-local  
過去バージョンがセットアップされている場合は先にアンインストールする。  
`ng version`  
`npm uninstall -g @angular/cli`  
```
npm install -g @angular/cli@14
ng version
```

## Angular Project 作成
https://angular.io/guide/setup-local
```
ng new material.angular.github
```

## Angular Material 導入
https://material.angular.io/guide/getting-started
```
ng add @angular/material

? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview: https://material.angular.io?theme=indigo-pink ]
? Set up global Angular Material typography styles? Yes  
? Include the Angular animations module? Include and enable animations
```

## Material ProgressSpinner 導入
`app.module.ts`
```ts:app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerSampleComponent } from './spinner-sample/spinner-sample.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';     // add
import {MatButtonModule} from '@angular/material/button';                        // add

@NgModule({
  declarations: [
    AppComponent,
    SpinnerSampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,   // add
    MatButtonModule,            // add
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## サービスの作成
```
ng generate service loading
```

`loading.service.ts`
```ts:loading.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  subject = new Subject<string>();

  constructor() { }

  setLoading(strMessage: string): void {
    this.subject.next(strMessage);
  }
}
```


## Component追加
```
ng generate component spinner-sample
```

## ComponentとSpinnerの組み込み

`app.component.ts`
```ts:app.component.ts
import { Component,OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loading$: Observable<string> = this.loadingService.subject.asObservable();
  strMsg:string="";

  constructor(private loadingService: LoadingService) { }

  title = 'material.angular.github';

  ngOnInit(): void {
    this.loading$.subscribe(
      (value: string) => { this.strMsg=value; }
    );
  }
}
```

`app.component.css`
```css:app.component.css
.loading {
  display: table;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  opacity: 0.8;
  z-index: 1;
}

.loading-inner {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

mat-spinner {
  margin: 0 auto;
}
```

`app.component.html`
```html:app.component.html
<div *ngIf="strMsg!==''" class="loading">
  <div class="loading-inner">
    <mat-spinner></mat-spinner>
    {{strMsg}}
  </div>
</div>

<app-spinner-sample></app-spinner-sample>
```

`spinner-sample.component.ts`
```ts:spinner-sample.component.ts
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
    }, 2000);
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

```

`spinner-sample.component.html`
```html:spinner-sample.component.html
<p>spinner-sample works!</p>
<button mat-stroked-button (click)="button_click()">abc</button>

```

## 👇参考
https://nanbu.marune205.net/2021/12/angular-material-waiting.html?m=1

