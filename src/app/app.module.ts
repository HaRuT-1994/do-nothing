import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { PanelMenuModule } from 'primeng/panelmenu';
import { DoNothingModule } from './do-nothing/do-nothing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DoSomethingModule } from './do-something/do-something.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PanelMenuModule,
    DoNothingModule,
    DoSomethingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
