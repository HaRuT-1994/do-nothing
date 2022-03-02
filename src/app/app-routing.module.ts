import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CohortComponent } from './components/addEdit/cohort/cohort.component';
import { ConfigCurvesComponent } from './components/addEdit/config-curves/config-curves.component';
import { ConfigFieldsComponent } from './components/addEdit/config-fields/config-fields.component';
import { ConfigScenariosComponent } from './components/addEdit/config-scenarios/config-scenarios.component';
import { DoNothingComponent } from './components/addEdit/do-nothing/do-nothing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PofBandsComponent } from './components/addEdit/pof-bands/pof-bands.component';
import { RiskLevelsComponent } from './components/addEdit/risk-levels/risk-levels.component';
import { AppConfig } from 'src/app/config/app.config';
import { CurvesTableComponent } from './components/viewTable/curves-table/curves-table.component';
import { CohortTableComponent } from './components/viewTable/cohort-table/cohort-table.component';

const route = AppConfig.routes;

const routes: Routes = [
  { path: route.add.doNothing, component: DoNothingComponent },
  { path: route.add.cohort, component: CohortComponent },
  { path: route.edit.cohort, component: CohortComponent },
  { path: route.add.configScenarios, component: ConfigScenariosComponent },
  { path: route.add.configFields, component: ConfigFieldsComponent },
  { path: route.add.configRiskLevels, component: RiskLevelsComponent },
  { path: route.add.configCurves, component: ConfigCurvesComponent },
  { path: route.add.pofBands, component: PofBandsComponent },

  { path: route.view.curvesTable, component: CurvesTableComponent },
  { path: route.view.cohortTable, component: CohortTableComponent },
  { path: '', redirectTo: route.add.doNothing, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
