
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
    {label: 'Config Cohorts', routerLink: 'config-cohort'},
    {label: 'Config Scenarios', routerLink: 'config-scenarios'},
    {label: 'Config Fields', routerLink: 'config-fields'},
    {label: 'Config Risk Levels', routerLink: 'config-risk-levels'},
    {label: 'Config Curves', routerLink: 'config-curves'},
    {label: 'Config PoF Bands', routerLink: 'config-pof-bands'},
  ];
  activeItem: MenuItem;

  constructor() {}

  ngOnInit() {
    const currentPath = window.location.pathname.slice(1);
    this.activeItem = this.items.filter((el) => el.routerLink === currentPath)[0]
  }
}
