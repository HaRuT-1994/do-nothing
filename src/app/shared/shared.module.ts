import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './components/loading/loading.component';
import { PageNotFoundComponent } from './components/page-not-found.component';

@NgModule({
  declarations: [
    LoadingComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoadingComponent,
    PageNotFoundComponent
 ]
})
export class SharedModule { }