import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppConfig } from '../config/app.config';

import { DataModelComponent } from './components/data-model/data-model.component';
import { BudgetTableComponent } from './components/tables/budget-table/budget-table.component';
import { BudgetYearsTableComponent } from './components/tables/budget-years-table/budget-years-table.component';
import { CohortTableComponent } from './components/tables/cohort-table/cohort-table.component';
import { CurvesTableComponent } from './components/tables/curves-table/curves-table.component';
import { DoNothingTableComponent } from './components/tables/do-nothing-table/do-nothing-table.component';
import { FieldsTableComponent } from './components/tables/fields-table/fields-table.component';
import { InterventionOptionsTableComponent } from './components/tables/intervention-options-table/intervention-options-table.component';
import { ListValuesTableComponent } from './components/tables/list-values-table/list-values-table.component';
import { ListsTableComponent } from './components/tables/lists-table/lists-table.component';
import { PoFBandsTableComponent } from './components/tables/pof-bands-table/pof-bands-table.component';
import { RatesTableComponent } from './components/tables/rates-table/rates-table.component';
import { RiskBasedDecisionTableComponent } from './components/tables/risk-based-decision-table/risk-based-decision-table.component';
import { RiskLevelsTableComponent } from './components/tables/risk-levels-table/risk-levels-table.component';
import { RunHistoryTableComponent } from './components/tables/run-history-table/run-history-table.component';
import { ScenariosTableComponent } from './components/tables/scenarios-table/scenarios-table.component';

const route = AppConfig.routes;

const routes: Routes = [
  { path: route.view.curvesTable, component: CurvesTableComponent },
  { path: route.view.cohortTable, component: CohortTableComponent },
  { path: route.view.scenariosTable, component: ScenariosTableComponent },
  { path: route.view.fieldsTable, component: FieldsTableComponent },
  { path: route.view.riskLevelsTable, component: RiskLevelsTableComponent },
  { path: route.view.pofBandsTable, component: PoFBandsTableComponent },
  { path: route.view.doNothingTable, component: DoNothingTableComponent },
  { path: route.view.budgetTable, component: BudgetTableComponent },
  { path: route.view.budgetYearsTable, component: BudgetYearsTableComponent },
  { path: route.view.listsTable, component: ListsTableComponent },
  { path: route.view.listValuesTable, component: ListValuesTableComponent },
  { path: route.view.ratesTable, component: RatesTableComponent },
  { path: route.view.interventionOptionsTable, component: InterventionOptionsTableComponent },
  { path: route.view.riskBasedDecisionTable, component: RiskBasedDecisionTableComponent },
  { path: route.view.runHistory, component: RunHistoryTableComponent },

  { path: route.data_model, component: DataModelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoNothingRoutingModule { }