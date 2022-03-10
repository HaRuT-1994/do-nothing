import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DoNothingRoutingModule } from './do-nothing-routing.module';

@NgModule({
  declarations: [ ],
  imports: [
    SharedModule,
    CommonModule,
    DoNothingRoutingModule
  ]
})
export class DoNothingModule { }