import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { PageNotFoundComponent } from './shared/components/page-not-found.component';
import { DoNothingComponent } from './do-nothing/components/addEdit/do-nothing/do-nothing.component';

const route = AppConfig.routes;

const routes: Routes = [
  { path: '', redirectTo: route.add.doNothing, pathMatch: 'full' },
  {
    path: route.add.doNothing,
    component: DoNothingComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
