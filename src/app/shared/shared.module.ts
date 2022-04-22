import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

import { LoadingComponent } from './components/loading/loading.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

@NgModule({
  declarations: [
    LoadingComponent,
    PageNotFoundComponent,
    AlertMessageComponent
  ],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports: [
    LoadingComponent,
    PageNotFoundComponent,
    AlertMessageComponent
 ]
})
export class SharedModule { }