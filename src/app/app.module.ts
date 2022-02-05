import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoNothingComponent } from './do-nothing/do-nothing.component';
import { ConfigScenariosComponent } from './config-scenarios/config-scenarios.component';

@NgModule({
  declarations: [
    AppComponent,
    DoNothingComponent,
    ConfigScenariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
