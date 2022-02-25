import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CohortComponent } from './components/cohort/cohort.component';
import { ConfigCurvesComponent } from './components/config-curves/config-curves.component';
import { ConfigFieldsComponent } from './components/config-fields/config-fields.component';
import { ConfigScenariosComponent } from './components/config-scenarios/config-scenarios.component';
import { DoNothingComponent } from './components/do-nothing/do-nothing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PofBandsComponent } from './components/pof-bands/pof-bands.component';
import { RiskLevelsComponent } from './components/risk-levels/risk-levels.component';
import { AppConfig } from 'src/app/config/app.config';

const routes: Routes = [
  { path: AppConfig.routes.doNothing, component: DoNothingComponent },
  { path: AppConfig.routes.cohort, component: CohortComponent },
  { path: AppConfig.routes.configScenarios, component: ConfigScenariosComponent },
  { path: AppConfig.routes.configFields, component: ConfigFieldsComponent },
  { path: AppConfig.routes.configRiskLevels, component: RiskLevelsComponent },
  { path: AppConfig.routes.configCurves, component: ConfigCurvesComponent },
  { path: AppConfig.routes.pofBands, component: PofBandsComponent },
  { path: '', redirectTo: AppConfig.routes.doNothing, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
