# Web画面でカレンダー日付入力を実現する

Angular Materialのdatepickerを組み込む手順をソースコード付きで解説します。  
![image](https://user-images.githubusercontent.com/38905609/177930612-3b9ac8c6-a5ff-4a69-87c5-c88254544c1b.png)

## datepicker とは

- 日付入力のための部品です。
- カレンダーから日付を指定することも可能です。

## この記事の目的

- Angular Material のdatepickerを組み込みます。

## 👇これより先は下記記事の内容を前提とします

- [Angular Material 標準コンポーネント構成の作成](https://qiita.com/jun_knd/items/059ba8ccfaa424417f6b)  

## datepicker の組み込み

[`main.component.html`]を以下内容で書き換え。

```html:main.component.html
<p>datepicker-sample works!</p>
<mat-form-field appearance="fill">
    <mat-label>Choose a date</mat-label>
  <!-- #docregion toggle -->
    <input matInput [matDatepicker]="picker">
    <mat-hint>MM/DD/YYYY</mat-hint>
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  <!-- #enddocregion toggle -->
  </mat-form-field>
```

## 表示確認①

```:sh
ng serve --open
```

![image](https://user-images.githubusercontent.com/38905609/174232842-f29056c6-9a3c-4b2d-8ae6-51551f9770b2.png)

## datepickerの日本ロケール化

日付フォーマットを日本ロケールに変更する(年/月/日 形式)

### [angular/material-moment-adapter]導入

※日付フォーマット対応用  
<https://www.npmjs.com/package/@angular/material-moment-adapter/v/14.0.2>

```sh
npm install @angular/material-moment-adapter

npm install moment
```

[`main.component.ts`]を以下内容で書き換え。

```ts:main.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class MainComponent implements OnInit {

  constructor(
    private commonService:CommonService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) { }

  ngOnInit(): void {
  }

  getDateFormatString(): string {
    if (this._locale === 'ja-JP') {
      return 'YYYY/MM/DD';
    } else if (this._locale === 'fr') {
      return 'DD/MM/YYYY';
    }
    return '';
  }
  
  buttonClick(){
    this.commonService.func01();
  }

}

```

[`main.component.html`]を以下内容で書き換え。

```html:main.component.html
<div class="content" role="main">
  <p>mainworks !</p>
  <br>
  <mat-form-field appearance="fill">
    <mat-label>input date</mat-label>
    <input matInput [matDatepicker]="dp">
    <mat-hint>{{getDateFormatString()}}</mat-hint>
    <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
    <mat-datepicker #dp></mat-datepicker>
  </mat-form-field>
</div>
```

## 表示確認②

```sh
ng serve --open
```

![image](https://user-images.githubusercontent.com/38905609/177930468-86e97cde-c83e-4b91-a2bd-62311540e2a8.png)

## 👇前提記事

- [Angular Material 標準コンポーネント構成の作成](https://docusaurus.plant11.com/angular/base_components)

## 👇関連記事

- [Angular Material Progress spinner 導入](https://docusaurus.plant11.com/angular/spinner)
- [Angular Material 動的Tree 導入](https://docusaurus.plant11.com/angular/dynamic_tree)
- [StackBlitzの導入からGitHub同期まで](https://docusaurus.plant11.com/tips/StackBlitz)

## 👇GitHubはこちら

- <https://github.com/jun-knd/material.angular.github/tree/datepicker>  
[![image](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/jun-knd/material.angular.github/tree/datepicker)

## 👇参考URL

- [Datepicker](https://material.angular.io/components/datepicker/overview)
- [datepicker-overview-example](https://stackblitz.com/edit/angular-3irqem?file=src/app/datepicker-overview-example.ts)
- [angular setup](https://angular.io/guide/setup-local)

[keywords]  
Angular Material DatePicker  

[Angular Material datepicker 導入](https://docusaurus.plant11.com/angular/datepicker)
