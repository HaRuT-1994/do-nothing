import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CohortComponent } from './cohort/cohort.component';
import { ConfigCurvesComponent } from './config-curves/config-curves.component';
import { ConfigFieldsComponent } from './config-fields/config-fields.component';
import { ConfigScenariosComponent } from './config-scenarios/config-scenarios.component';
import { DoNothingComponent } from './do-nothing/do-nothing.component';
import { PofBandsComponent } from './pof-bands/pof-bands.component';
import { RiskLevelsComponent } from './risk-levels/risk-levels.component';

const routes: Routes = [
  { path: '', redirectTo: '/do-nothing', pathMatch: 'full' },
  { path: "do-nothing", component: DoNothingComponent },
  { path: "cohort", component: CohortComponent },
  { path: "config-scenarios", component: ConfigScenariosComponent },
  { path: "config-fields", component: ConfigFieldsComponent },
  { path: "config-risk-levels", component: RiskLevelsComponent },
  { path: "config-curves", component: ConfigCurvesComponent },
  { path: "pof-bands", component: PofBandsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
