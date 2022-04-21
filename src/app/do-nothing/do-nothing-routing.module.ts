import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppConfig } from '../config/app.config';

import { CohortComponent } from './components/addEdit/cohort/cohort.component';
import { BudgetYearsComponent } from './components/addEdit/config-budget-year/config-budget-year.component';
import { ConfigBudgetComponent } from './components/addEdit/config-budget/config-budget.component';
import { ConfigCurvesComponent } from './components/addEdit/config-curves/config-curves.component';
import { ConfigFieldsComponent } from './components/addEdit/config-fields/config-fields.component';
import { ConfigInterventionOptionsComponent } from './components/addEdit/config-intervention-options/config-intervention-options.component';
import { ConfigListValuesComponent } from './components/addEdit/config-list-values/config-list-values.component';
import { ConfigListsComponent } from './components/addEdit/config-lists/config-lists.component';
import { ConfigRatesComponent } from './components/addEdit/config-rates/config-rates.component';
import { ConfigRiskBasedDecisionsComponent } from './components/addEdit/config-risk-based-decisions/config-risk-based-decisions.component';
import { ConfigScenariosComponent } from './components/addEdit/config-scenarios/config-scenarios.component';
import { DoNothingComponent } from './components/addEdit/do-nothing/do-nothing.component';
import { PofBandsComponent } from './components/addEdit/pof-bands/pof-bands.component';
import { RiskLevelsComponent } from './components/addEdit/risk-levels/risk-levels.component';
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
  { path: route.add.doNothing, component: DoNothingComponent },
  { path: route.edit.doNothing, component: DoNothingComponent },

  { path: route.add.cohort, component: CohortComponent },
  { path: route.edit.configCohort, component: CohortComponent },

  { path: route.add.configScenarios, component: ConfigScenariosComponent },
  { path: route.edit.configScenarios, component: ConfigScenariosComponent },

  { path: route.add.configFields, component: ConfigFieldsComponent },
  { path: route.edit.configFields, component: ConfigFieldsComponent },

  { path: route.add.configRiskLevels, component: RiskLevelsComponent },
  { path: route.edit.configRiskLevels, component: RiskLevelsComponent },

  { path: route.add.configCurves, component: ConfigCurvesComponent },
  { path: route.edit.configCurves, component: ConfigCurvesComponent },

  { path: route.add.pofBands, component: PofBandsComponent },
  { path: route.edit.pofBands, component: PofBandsComponent },

  { path: route.add.configBudget, component: ConfigBudgetComponent},
  { path: route.edit.configBudget, component: ConfigBudgetComponent},

  { path: route.add.configBudgetYear, component: BudgetYearsComponent},
  { path: route.edit.configBudgetYear, component: BudgetYearsComponent},

  { path: route.add.configInterventionOptions, component: ConfigInterventionOptionsComponent },
  { path: route.edit.configInterventionOptions, component: ConfigInterventionOptionsComponent },

  { path: route.add.configRates, component: ConfigRatesComponent },
  { path: route.edit.configRates, component: ConfigRatesComponent },

  { path: route.add.configRiskBasedDecision, component: ConfigRiskBasedDecisionsComponent },
  { path: route.edit.configRiskBasedDecision, component: ConfigRiskBasedDecisionsComponent },

  { path: route.add.configLists, component: ConfigListsComponent },
  { path: route.edit.configLists, component: ConfigListsComponent },

  { path: route.add.configListValues, component: ConfigListValuesComponent },
  { path: route.edit.configListValues, component: ConfigListValuesComponent },

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