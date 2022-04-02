import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//from libs
import { TabMenuModule } from 'primeng/tabmenu';
import { MessageModule } from 'primeng/message';
import { MatSelectModule } from '@angular/material/select';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from '../shared/shared.module';
import { PanelMenuModule } from 'primeng/panelmenu';

import { DoNothingRoutingModule } from './do-nothing-routing.module';
import { CohortComponent } from './components/addEdit/cohort/cohort.component';
import { ConfigCurvesComponent } from './components/addEdit/config-curves/config-curves.component';
import { ConfigFieldsComponent } from './components/addEdit/config-fields/config-fields.component';
import { ConfigScenariosComponent } from './components/addEdit/config-scenarios/config-scenarios.component';
import { PofBandsComponent } from './components/addEdit/pof-bands/pof-bands.component';
import { DoNothingComponent } from './components/addEdit/do-nothing/do-nothing.component';
import { RiskLevelsComponent } from './components/addEdit/risk-levels/risk-levels.component';
import { DoNothingTableComponent } from './components/viewTable/do-nothing-table/do-nothing-table.component';
import { CohortTableComponent } from './components/viewTable/cohort-table/cohort-table.component';
import { FieldsTableComponent } from './components/viewTable/fields-table/fields-table.component';
import { PoFBandsTableComponent } from './components/viewTable/pof-bands-table/pof-bands-table.component';
import { ScenariosTableComponent } from './components/viewTable/scenarios-table/scenarios-table.component';
import { RiskLevelsTableComponent } from './components/viewTable/risk-levels-table/risk-levels-table.component';
import { CurvesTableComponent } from './components/viewTable/curves-table/curves-table.component';
import { PofBandsService } from './services/pof-bands.service';
import { ConfigBudgetComponent } from './components/addEdit/config-budget/config-budget.component';
import { ConfigInterventionOptionsComponent } from './components/addEdit/config-intervention-options/config-intervention-options.component';
import { ConfigRatesComponent } from './components/addEdit/config-rates/config-rates.component';
import { ConfigListsComponent } from './components/addEdit/config-lists/config-lists.component';
import { ConfigRiskBasedDecisionsComponent } from './components/addEdit/config-risk-based-decisions/config-risk-based-decisions.component';
import { ConfigListValuesComponent } from './components/addEdit/config-list-values/config-list-values.component';
import { BudgetTableComponent } from './components/viewTable/budget-table/budget-table.component';
import { InterventionOptionsTableComponent } from './components/viewTable/intervention-options-table/intervention-options-table.component';
import { ListValuesTableComponent } from './components/viewTable/list-values-table/list-values-table.component';
import { ListsTableComponent } from './components/viewTable/lists-table/lists-table.component';
import { RatesTableComponent } from './components/viewTable/rates-table/rates-table.component';
import { RiskBasedDecisionTableComponent } from './components/viewTable/risk-based-decision-table/risk-based-decision-table.component';
import { RunHistoryTableComponent } from './components/viewTable/run-history-table/run-history-table.component';
import { ControlTablesComponent } from './components/controls/control-tables/control-tables.component';
import { DataModelComponent } from './components/data-model/data-model.component';

@NgModule({
  declarations: [
    DoNothingComponent,
    CohortComponent,
    ConfigCurvesComponent,
    ConfigFieldsComponent,
    ConfigScenariosComponent,
    PofBandsComponent,
    RiskLevelsComponent,
    DoNothingTableComponent,
    CohortTableComponent,
    CurvesTableComponent,
    FieldsTableComponent,
    ScenariosTableComponent,
    PoFBandsTableComponent,
    RiskLevelsTableComponent,
    ConfigBudgetComponent,
    ConfigInterventionOptionsComponent,
    ConfigRatesComponent,
    ConfigRiskBasedDecisionsComponent,
    ConfigListsComponent,
    ConfigListValuesComponent,
    BudgetTableComponent,
    InterventionOptionsTableComponent,
    ListValuesTableComponent,
    ListsTableComponent,
    RatesTableComponent,
    RiskBasedDecisionTableComponent,
    RunHistoryTableComponent,
    ControlTablesComponent,
    DataModelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TabMenuModule,
    MessageModule,
    MatSelectModule,
    PaginatorModule,
    PanelMenuModule,
    DoNothingRoutingModule
  ],
  providers: [
    PofBandsService
  ]
})
export class DoNothingModule { }