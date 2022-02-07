import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [
    {label: 'Do Nothing', routerLink: 'do-nothing'},
    {label: 'Cohorts', routerLink: 'cohort'},
    {label: 'Config Scenarios', routerLink: 'config-scenarios'},
    {label: 'Config Fields', routerLink: 'config-fields'},
    {label: 'Config Risk Levels', routerLink: 'config-risk-levels'},
    {label: 'Config Curves', routerLink: 'config-curves'},
    {label: 'PoF Bands', routerLink: 'pof-bands'},
  ];
  activeItem: MenuItem;

  ngOnInit() {
    this.activeItem = this.items[0];
  }
}
