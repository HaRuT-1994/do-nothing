
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  items: MenuItem[] = [
    {
    label: 'Menu',
    items: [
      {
        label: 'Do Nothing',
        items: [
          {
          label: 'Add Configs',
          icon:'pi pi-fw pi-plus',
          items: [
            { label: 'Do Nothing', routerLink: AppConfig.routes.add.doNothing },
            { label: 'Config Cohort', routerLink: AppConfig.routes.add.cohort },
            { label: 'Config Fields', routerLink: AppConfig.routes.add.configFields },
            { label: 'Config Scenarios', routerLink: AppConfig.routes.add.configScenarios },
            { label: 'Config Curves', routerLink: AppConfig.routes.add.configCurves },
            { label: 'PoF Bands', routerLink: AppConfig.routes.add.pofBands },
            { label: 'Risk Levels', routerLink: AppConfig.routes.add.configRiskLevels },
          ]
        },
        {
          label: 'View all',
          icon:'pi pi-fw pi-external-link',
          items: [
            { label: 'Do Nothing', routerLink: AppConfig.routes.view.doNothingTable },
            { label: 'Config Cohort', routerLink: AppConfig.routes.view.cohortTable },
            { label: 'Config Fields', routerLink: AppConfig.routes.view.fieldsTable },
            { label: 'Config Scenarios', routerLink: AppConfig.routes.view.scenariosTable },
            { label: 'Config Curves', routerLink: AppConfig.routes.view.curvesTable },
            { label: 'PoF Bands', routerLink: AppConfig.routes.view.pofBandsTable },
            { label: 'Risk Levels', routerLink: AppConfig.routes.view.riskLevelsTable },
          ]
        }
       ]
      },
      {
        label: 'Do Something',
        items: [
          {
          label: 'Add Configs',
          icon:'pi pi-fw pi-plus',
          items: [
            { label: 'Do Nothing', routerLink: AppConfig.routes.add.doNothing },
            { label: 'Config Cohort', routerLink: AppConfig.routes.add.cohort },
            { label: 'Config Fields', routerLink: AppConfig.routes.add.configFields },
            { label: 'Config Scenarios', routerLink: AppConfig.routes.add.configScenarios },
            { label: 'Config Curves', routerLink: AppConfig.routes.add.configCurves },
            { label: 'PoF Bands', routerLink: AppConfig.routes.add.pofBands },
            { label: 'Risk Levels', routerLink: AppConfig.routes.add.configRiskLevels },
            { label: 'Config Budget', routerLink: AppConfig.routes.add.configBudget }
          ]
        },
        {
          label: 'View all',
          icon:'pi pi-fw pi-external-link',
          items: [
            { label: 'Do Nothing', routerLink: AppConfig.routes.view.doNothingTable },
            { label: 'Config Cohort', routerLink: AppConfig.routes.view.cohortTable },
            { label: 'Config Fields', routerLink: AppConfig.routes.view.fieldsTable },
            { label: 'Config Scenarios', routerLink: AppConfig.routes.view.scenariosTable },
            { label: 'Config Curves', routerLink: AppConfig.routes.view.curvesTable },
            { label: 'PoF Bands', routerLink: AppConfig.routes.view.pofBandsTable },
            { label: 'Risk Levels', routerLink: AppConfig.routes.view.riskLevelsTable },
          ]
        }
       ]
      }
    ],
    
    }
];
  activeItem: MenuItem;

  constructor() {}

  ngOnInit() {
    const currentPath = location.pathname.slice(1);
    this.activeItem = this.items.filter((el) => el.routerLink === currentPath)[0]
  }
}
