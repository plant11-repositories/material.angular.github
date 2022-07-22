import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material.module';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';

import { HttpClientModule } from '@angular/common/http';
import { UploaderComponent } from './uploader/uploader.component';  // add

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,   // add
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
