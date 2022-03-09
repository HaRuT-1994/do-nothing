import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { MessageModule } from 'primeng/message';
import { MatSelectModule } from '@angular/material/select';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    TabMenuModule,
    MessageModule,
    MatSelectModule,
    PanelMenuModule,
    PaginatorModule,
  ],
 exports: [
   LoadingComponent
 ]
})
export class SharedModule { }