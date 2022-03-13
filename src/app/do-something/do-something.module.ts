import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoSomethingRoutingModule } from './do-something-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigBudgetComponent } from './components/addEdit/config-budget/config-budget.component';
import { ConfigInterventionOptionsComponent } from './components/addEdit/config-intervention-options/config-intervention-options.component';
import { ConfigRatesComponent } from './components/addEdit/config-rates/config-rates.component';
import { ConfigRiskBasedDecisionsComponent } from './components/addEdit/config-risk-based-decisions/config-risk-based-decisions.component';
import { ConfigListsComponent } from './components/addEdit/config-lists/config-lists.component';
import { ConfigListValuesComponent } from './components/addEdit/config-list-values/config-list-values.component';
import { BudgetTableComponent } from './components/viewTable/budget-table/budget-table.component';
import { InterventionOptionsTableComponent } from './components/viewTable/intervention-options-table/intervention-options-table.component';
import { ListValuesTableComponent } from './components/viewTable/list-values-table/list-values-table.component';
import { ListsTableComponent } from './components/viewTable/lists-table/lists-table.component';
import { RatesTableComponent } from './components/viewTable/rates-table/rates-table.component';
import { RiskBasedDecisionTableComponent } from './components/viewTable/risk-based-decision-table/risk-based-decision-table.component';
import { RunHistoryTableComponent } from './components/viewTable/run-history-table/run-history-table.component';

@NgModule({
  declarations: [ 
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
    RunHistoryTableComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    DoSomethingRoutingModule
  ]
})
export class DoSomethingModule { }