import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoSomethingRoutingModule } from './do-something-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigBudgetComponent } from './components/addEdit/config-budget/config-budget.component';

@NgModule({
  declarations: [ 
    ConfigBudgetComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    DoSomethingRoutingModule
  ]
})
export class DoSomethingModule { }