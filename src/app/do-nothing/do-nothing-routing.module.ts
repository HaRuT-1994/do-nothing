import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppConfig } from '../config/app.config';

import { CohortComponent } from '../shared/components/addEdit/cohort/cohort.component';
import { ConfigCurvesComponent } from '../shared/components/addEdit/config-curves/config-curves.component';
import { ConfigFieldsComponent } from '../shared/components/addEdit/config-fields/config-fields.component';
import { ConfigScenariosComponent } from '../shared/components/addEdit/config-scenarios/config-scenarios.component';
import { DoNothingComponent } from '../shared/components/addEdit/do-nothing/do-nothing.component';
import { PofBandsComponent } from '../shared/components/addEdit/pof-bands/pof-bands.component';
import { RiskLevelsComponent } from '../shared/components/addEdit/risk-levels/risk-levels.component';
import { CohortTableComponent } from '../shared/components/viewTable/cohort-table/cohort-table.component';
import { CurvesTableComponent } from '../shared/components/viewTable/curves-table/curves-table.component';
import { DoNothingTableComponent } from '../shared/components/viewTable/do-nothing-table/do-nothing-table.component';
import { FieldsTableComponent } from '../shared/components/viewTable/fields-table/fields-table.component';
import { PoFBandsTableComponent } from '../shared/components/viewTable/pof-bands-table/pof-bands-table.component';
import { RiskLevelsTableComponent } from '../shared/components/viewTable/risk-levels-table/risk-levels-table.component';
import { ScenariosTableComponent } from '../shared/components/viewTable/scenarios-table/scenarios-table.component';

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

  { path: route.view.curvesTable, component: CurvesTableComponent },
  { path: route.view.cohortTable, component: CohortTableComponent },
  { path: route.view.scenariosTable, component: ScenariosTableComponent },
  { path: route.view.fieldsTable, component: FieldsTableComponent },
  { path: route.view.riskLevelsTable, component: RiskLevelsTableComponent },
  { path: route.view.pofBandsTable, component: PoFBandsTableComponent },
  { path: route.view.doNothingTable, component: DoNothingTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoNothingRoutingModule { }