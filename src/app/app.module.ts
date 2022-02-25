import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { TabMenuModule } from 'primeng/tabmenu';
import { MessageModule } from 'primeng/message';

import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { DoNothingComponent } from './components/do-nothing/do-nothing.component';
import { ConfigScenariosComponent } from './components/config-scenarios/config-scenarios.component';
import { CohortComponent } from './components/cohort/cohort.component';
import { ConfigCurvesComponent } from './components/config-curves/config-curves.component';
import { ConfigFieldsComponent } from './components/config-fields/config-fields.component';
import { PofBandsComponent } from './components/pof-bands/pof-bands.component';
import { RiskLevelsComponent } from './components/risk-levels/risk-levels.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DoNothingComponent,
    ConfigScenariosComponent,
    CohortComponent,
    PofBandsComponent,
    RiskLevelsComponent,
    ConfigCurvesComponent,
    ConfigFieldsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TabMenuModule,
    MessageModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
