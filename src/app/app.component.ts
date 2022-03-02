
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AppConfig } from 'src/app/config/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  items: MenuItem[] = [
    {label: 'Do Nothing', routerLink: AppConfig.routes.add.doNothing},
    {label: 'Config Cohorts', routerLink: AppConfig.routes.add.cohort},
    {label: 'Config Scenarios', routerLink: AppConfig.routes.add.configScenarios},
    {label: 'Config Fields', routerLink: AppConfig.routes.add.configFields},
    {label: 'Config Risk Levels', routerLink: AppConfig.routes.add.configRiskLevels},
    {label: 'Config Curves', routerLink: AppConfig.routes.add.configCurves},
    {label: 'Config PoF Bands', routerLink: AppConfig.routes.add.pofBands},
  ];
  activeItem: MenuItem;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const currentPath = window.location.pathname.slice(1);
    this.activeItem = this.items.filter((el) => el.routerLink === currentPath)[0]
  }
}
