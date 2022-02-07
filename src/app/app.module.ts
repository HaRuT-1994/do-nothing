import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import {TabMenuModule} from 'primeng/tabmenu';

import { AppComponent } from './app.component';
import { DoNothingComponent } from './do-nothing/do-nothing.component';
import { ConfigScenariosComponent } from './config-scenarios/config-scenarios.component';
import { CohortComponent } from './cohort/cohort.component';
import { PofBandsComponent } from './pof-bands/pof-bands.component';
import { RiskLevelsComponent } from './risk-levels/risk-levels.component';
import { ConfigCurvesComponent } from './config-curves/config-curves.component';
import { ConfigFieldsComponent } from './config-fields/config-fields.component';

@NgModule({
  declarations: [
    AppComponent,
    DoNothingComponent,
    ConfigScenariosComponent,
    CohortComponent,
    PofBandsComponent,
    RiskLevelsComponent,
    ConfigCurvesComponent,
    ConfigFieldsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
