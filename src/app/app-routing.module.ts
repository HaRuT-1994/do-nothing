import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { PageNotFoundComponent } from './shared/components/page-not-found.component';
import { HomeComponent } from './index/home/home.component';

const route = AppConfig.routes;

const routes: Routes = [
  { path: '', redirectTo: route.projects.plans, pathMatch: 'full' },
  {
    path: route.add.doNothing,
    loadChildren: () => import('./do-nothing/do-nothing.module').then(m => m.DoNothingModule)
  },
  {
    path: route.projects.plans,
    component: HomeComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
