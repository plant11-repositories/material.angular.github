import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material.module';
import { TreeSampleComponent } from './tree-sample/tree-sample.component';        // add

@NgModule({
  declarations: [
    AppComponent,
    TreeSampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,                // add
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
