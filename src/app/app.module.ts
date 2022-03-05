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
import { DoNothingComponent } from './components/addEdit/do-nothing/do-nothing.component';
import { ConfigScenariosComponent } from './components/addEdit/config-scenarios/config-scenarios.component';
import { CohortComponent } from './components/addEdit/cohort/cohort.component';
import { ConfigCurvesComponent } from './components/addEdit/config-curves/config-curves.component';
import { ConfigFieldsComponent } from './components/addEdit/config-fields/config-fields.component';
import { PofBandsComponent } from './components/addEdit/pof-bands/pof-bands.component';
import { RiskLevelsComponent } from './components/addEdit/risk-levels/risk-levels.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CurvesTableComponent } from './components/viewTable/curves-table/curves-table.component';
import { CohortTableComponent } from './components/viewTable/cohort-table/cohort-table.component';
import { ScenariosTableComponent } from './components/viewTable/scenarios-table/scenarios-table.component';
import { PoFBandsTableComponent } from './components/viewTable/pof-bands-table/pof-bands-table.component';
import { RiskLevelsTableComponent } from './components/viewTable/risk-levels-table/risk-levels-table.component';
import { FieldsTableComponent } from './components/viewTable/fields-table/fields-table.component';
import { DoNothingTableComponent } from './components/viewTable/do-nothing-table/do-nothing-table.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
import { LoadingComponent } from './shared/components/loading/loading.component';

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
    PageNotFoundComponent,
    CurvesTableComponent,
    CohortTableComponent,
    ScenariosTableComponent,
    PoFBandsTableComponent,
    RiskLevelsTableComponent,
    FieldsTableComponent,
    DoNothingTableComponent,
    LoadingComponent
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
    MatSelectModule,
    PanelMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
