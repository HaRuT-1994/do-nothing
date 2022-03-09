import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoNothingComponent } from './components/addEdit/do-nothing/do-nothing.component';
import { ConfigScenariosComponent } from './components/addEdit/config-scenarios/config-scenarios.component';
import { CohortComponent } from './components/addEdit/cohort/cohort.component';
import { PofBandsComponent } from './components/addEdit/pof-bands/pof-bands.component';
import { RiskLevelsComponent } from './components/addEdit/risk-levels/risk-levels.component';
import { ConfigCurvesComponent } from './components/addEdit/config-curves/config-curves.component';
import { ConfigFieldsComponent } from './components/addEdit/config-fields/config-fields.component';
import { CurvesTableComponent } from './components/viewTable/curves-table/curves-table.component';
import { CohortTableComponent } from './components/viewTable/cohort-table/cohort-table.component';
import { ScenariosTableComponent } from './components/viewTable/scenarios-table/scenarios-table.component';
import { PoFBandsTableComponent } from './components/viewTable/pof-bands-table/pof-bands-table.component';
import { RiskLevelsTableComponent } from './components/viewTable/risk-levels-table/risk-levels-table.component';
import { FieldsTableComponent } from './components/viewTable/fields-table/fields-table.component';
import { DoNothingTableComponent } from './components/viewTable/do-nothing-table/do-nothing-table.component';
import { DoNothingRoutingModule } from './do-nothing-routing.module';

import { TabMenuModule } from 'primeng/tabmenu';
import { MessageModule } from 'primeng/message';
import { MatSelectModule } from '@angular/material/select';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DoNothingComponent,
    ConfigScenariosComponent,
    CohortComponent,
    PofBandsComponent,
    RiskLevelsComponent,
    ConfigCurvesComponent,
    ConfigFieldsComponent,
    CurvesTableComponent,
    CohortTableComponent,
    ScenariosTableComponent,
    PoFBandsTableComponent,
    RiskLevelsTableComponent,
    FieldsTableComponent,
    DoNothingTableComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DoNothingRoutingModule,
    MessageModule,
    MatSelectModule,
    PaginatorModule,
    TabMenuModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DoNothingModule { }