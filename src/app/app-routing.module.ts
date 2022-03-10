import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DoNothingComponent } from './shared/components/addEdit/do-nothing/do-nothing.component';

const route = AppConfig.routes;

const routes: Routes = [
  {
    path: route.add.doNothing,
    component: DoNothingComponent
  },
  { path: '', redirectTo: route.add.doNothing, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
