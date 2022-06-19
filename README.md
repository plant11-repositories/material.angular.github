# Angular Material datepicker 導入

## Angular Material datepicker イメージ
![image](https://user-images.githubusercontent.com/38905609/174232463-5d97ae18-deeb-4254-95db-ded72188409b.png)


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

## コンポーネント 作成
https://angular.io/guide/component-overview
```
ng generate component datepicker-sample
```

[`app.component.html`]を以下内容に書き換え。
```html:app.component.html
<app-datepicker-sample></app-datepicker-sample>
```

## datepicker の組み込み
https://material.angular.io/components/datepicker/overview  
https://stackblitz.com/edit/angular-3irqem?file=src/app/datepicker-overview-example.ts  

[`src/material.module.ts`]を以下内容で作成。
```ts:material.module.ts
import {NgModule} from '@angular/core';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  exports: [
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ]
})
export class MaterialExampleModule {}
```

[`src/app/app.module.ts`]を以下内容へ書き換え。
```ts:app.module.ts
...
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerSampleComponent } from './datepicker-sample/datepicker-sample.component';

import {MaterialExampleModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerSampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

[`/src/app/datepicker-sample/datepicker-sample.component.html`]を以下内容で書き換え。
```html:datepicker-sample.component.html
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

## 動作確認
https://angular.io/guide/setup-local

```
ng serve --open
```

![image](https://user-images.githubusercontent.com/38905609/174232842-f29056c6-9a3c-4b2d-8ae6-51551f9770b2.png)


## datepickerの日本ロケール化
日付フォーマットを日本ロケールに変更する(YYYY/MM/DD)
https://stackblitz.com/edit/angular-pn5xvs?file=src/app/datepicker-locale-example.ts  


## [angular/material-moment-adapter]導入
※日付フォーマット対応用  
https://www.npmjs.com/package/@angular/material-moment-adapter/v/14.0.2

```
npm install @angular/material-moment-adapter

npm install moment
```

[`/src/app/datepicker-sample/datepicker-sample.component.ts`]を以下内容で書き換え。
```ts:datepicker-sample.component.ts
import {Component, Inject} from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';

/** @title Datepicker with different locale */
@Component({
  selector: 'app-datepicker-sample',
  templateUrl: 'datepicker-sample.component.html',
  styleUrls: ['datepicker-sample.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class DatepickerSampleComponent {

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) {}

  getDateFormatString(): string {
    if (this._locale === 'ja-JP') {
      return 'YYYY/MM/DD';
    } else if (this._locale === 'fr') {
      return 'DD/MM/YYYY';
    }
    return '';
  }

}
```

[`/src/app/datepicker-sample/datepicker-sample.component.html`]を以下内容で書き換え。
```html:datepicker-sample.component.html
<p>datepicker-sample works!</p>
<mat-form-field appearance="fill">
  <mat-label>input date</mat-label>
  <input matInput [matDatepicker]="dp">
  <mat-hint>{{getDateFormatString()}}</mat-hint>
  <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
  <mat-datepicker #dp></mat-datepicker>
</mat-form-field>
```


## 動作確認
https://angular.io/guide/setup-local

```
ng serve --open
```

![image](https://user-images.githubusercontent.com/38905609/174232463-5d97ae18-deeb-4254-95db-ded72188409b.png)

## github
ソースは下記githubを参照下さい。  
https://github.com/jun-knd/material.angular.github/tree/datepicker
