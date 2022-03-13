import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { CohortComponent } from 'src/app/shared/components/addEdit/cohort/cohort.component';
import { ConfigCurvesComponent } from 'src/app/shared/components/addEdit/config-curves/config-curves.component';
import { ConfigFieldsComponent } from 'src/app/shared/components/addEdit/config-fields/config-fields.component';
import { ConfigScenariosComponent } from 'src/app/shared/components/addEdit/config-scenarios/config-scenarios.component';
import { DoNothingComponent } from 'src/app/shared/components/addEdit/do-nothing/do-nothing.component';
import { PofBandsComponent } from 'src/app/shared/components/addEdit/pof-bands/pof-bands.component';
import { RiskLevelsComponent } from 'src/app/shared/components/addEdit/risk-levels/risk-levels.component';
import { CohortTableComponent } from 'src/app/shared/components/viewTable/cohort-table/cohort-table.component';
import { CurvesTableComponent } from 'src/app/shared/components/viewTable/curves-table/curves-table.component';
import { DoNothingTableComponent } from 'src/app/shared/components/viewTable/do-nothing-table/do-nothing-table.component';
import { FieldsTableComponent } from 'src/app/shared/components/viewTable/fields-table/fields-table.component';
import { PoFBandsTableComponent } from 'src/app/shared/components/viewTable/pof-bands-table/pof-bands-table.component';
import { RiskLevelsTableComponent } from 'src/app/shared/components/viewTable/risk-levels-table/risk-levels-table.component';
import { ScenariosTableComponent } from 'src/app/shared/components/viewTable/scenarios-table/scenarios-table.component';
import { ConfigBudgetComponent } from './components/addEdit/config-budget/config-budget.component';
import { ConfigInterventionOptionsComponent } from './components/addEdit/config-intervention-options/config-intervention-options.component';
import { ConfigListValuesComponent } from './components/addEdit/config-list-values/config-list-values.component';
import { ConfigListsComponent } from './components/addEdit/config-lists/config-lists.component';
import { ConfigRatesComponent } from './components/addEdit/config-rates/config-rates.component';
import { ConfigRiskBasedDecisionsComponent } from './components/addEdit/config-risk-based-decisions/config-risk-based-decisions.component';
import { BudgetTableComponent } from './components/viewTable/budget-table/budget-table.component';
import { InterventionOptionsTableComponent } from './components/viewTable/intervention-options-table/intervention-options-table.component';
import { ListValuesTableComponent } from './components/viewTable/list-values-table/list-values-table.component';
import { ListsTableComponent } from './components/viewTable/lists-table/lists-table.component';
import { RatesTableComponent } from './components/viewTable/rates-table/rates-table.component';
import { RiskBasedDecisionTableComponent } from './components/viewTable/risk-based-decision-table/risk-based-decision-table.component';
import { RunHistoryTableComponent } from './components/viewTable/run-history-table/run-history-table.component';

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
  //{ path: route.edit.configBudget, component: ConfigBudgetComponent},

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
  { path: route.view.listsTable, component: ListsTableComponent },
  { path: route.view.listValuesTable, component: ListValuesTableComponent },
  { path: route.view.ratesTable, component: RatesTableComponent },
  { path: route.view.interventionOptionsTable, component: InterventionOptionsTableComponent },
  { path: route.view.riskBasedDecisionTable, component: RiskBasedDecisionTableComponent },
  { path: route.view.runHistory, component: RunHistoryTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoSomethingRoutingModule { }