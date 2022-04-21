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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

import { DoNothingRoutingModule } from './do-nothing-routing.module';
import { CohortComponent } from './components/addEdit/cohort/cohort.component';
import { ConfigCurvesComponent } from './components/addEdit/config-curves/config-curves.component';
import { ConfigFieldsComponent } from './components/addEdit/config-fields/config-fields.component';
import { ConfigScenariosComponent } from './components/addEdit/config-scenarios/config-scenarios.component';
import { PofBandsComponent } from './components/addEdit/pof-bands/pof-bands.component';
import { DoNothingComponent } from './components/addEdit/do-nothing/do-nothing.component';
import { RiskLevelsComponent } from './components/addEdit/risk-levels/risk-levels.component';
import { DoNothingTableComponent } from './components/tables/do-nothing-table/do-nothing-table.component';
import { CohortTableComponent } from './components/tables/cohort-table/cohort-table.component';
import { FieldsTableComponent } from './components/tables/fields-table/fields-table.component';
import { PoFBandsTableComponent } from './components/tables/pof-bands-table/pof-bands-table.component';
import { ScenariosTableComponent } from './components/tables/scenarios-table/scenarios-table.component';
import { RiskLevelsTableComponent } from './components/tables/risk-levels-table/risk-levels-table.component';
import { CurvesTableComponent } from './components/tables/curves-table/curves-table.component';
import { PofBandsService } from './services/pof-bands.service';
import { ConfigBudgetComponent } from './components/addEdit/config-budget/config-budget.component';
import { ConfigInterventionOptionsComponent } from './components/addEdit/config-intervention-options/config-intervention-options.component';
import { ConfigRatesComponent } from './components/addEdit/config-rates/config-rates.component';
import { ConfigListsComponent } from './components/addEdit/config-lists/config-lists.component';
import { ConfigRiskBasedDecisionsComponent } from './components/addEdit/config-risk-based-decisions/config-risk-based-decisions.component';
import { ConfigListValuesComponent } from './components/addEdit/config-list-values/config-list-values.component';
import { BudgetTableComponent } from './components/tables/budget-table/budget-table.component';
import { InterventionOptionsTableComponent } from './components/tables/intervention-options-table/intervention-options-table.component';
import { ListValuesTableComponent } from './components/tables/list-values-table/list-values-table.component';
import { ListsTableComponent } from './components/tables/lists-table/lists-table.component';
import { RatesTableComponent } from './components/tables/rates-table/rates-table.component';
import { RiskBasedDecisionTableComponent } from './components/tables/risk-based-decision-table/risk-based-decision-table.component';
import { RunHistoryTableComponent } from './components/tables/run-history-table/run-history-table.component';
import { ControlTablesComponent } from './components/controls/control-tables/control-tables.component';
import { DataModelComponent } from './components/data-model/data-model.component';
import { CohortService } from './services/cohort.service';
import { ConfigBudgetService } from './services/config-budget.service';
import { ConfigCurvesService } from './services/config-curves.service';
import { ConfigFieldsService } from './services/config-fields.service';
import { ConfigInterventionOptionsService } from './services/config-InterventionOptions.service';
import { ConfigListsService } from './services/config-lists.service';
import { ConfigListValuesService } from './services/config-listValues.service';
import { ConfigRatesService } from './services/config-rates.service';
import { ConfigRiskBasedDecisionsService } from './services/config-RiskBasedDecisions.service';
import { ConfigScenariosService } from './services/config-scenarios.service';
import { DoNothingService } from './services/do-nothing.service';
import { RiskLevelsService } from './services/risk-levels.service';
import { RunHistoryService } from './services/runHistroy.service';
import { DialogService } from 'primeng/dynamicdialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import { ConfigBudgetYearService } from './services/config-budget-year.service';
import { LookupService } from './services/lookup.service';
import { BudgetYearsComponent } from './components/addEdit/config-budget-year/config-budget-year.component';
import { BudgetYearsTableComponent } from './components/tables/budget-years-table/budget-years-table.component';

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
    DataModelComponent,
    BudgetYearsComponent,
    BudgetYearsTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TabMenuModule,
    MessageModule,
    MatSelectModule,
    PaginatorModule,
    PanelMenuModule,
    TableModule,
    ConfirmDialogModule,
    DoNothingRoutingModule,
    MultiSelectModule,
    DropdownModule
  ],
  providers: [
    CohortService,
    PofBandsService,
    ConfigBudgetService,
    ConfigBudgetYearService,
    ConfigCurvesService,
    ConfigFieldsService,
    ConfigInterventionOptionsService,
    ConfigListsService,
    ConfigListValuesService,
    ConfigRatesService,
    ConfigRiskBasedDecisionsService,
    ConfigScenariosService,
    DoNothingService,
    RiskLevelsService,
    RunHistoryService,
    ConfirmationService,
    DialogService,
    LookupService
  ]
})
export class DoNothingModule { }