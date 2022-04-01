
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
        label: 'Run Scenarios',
        items: [
          {
          label: 'Add Configs',
          icon:'pi pi-fw pi-plus',
          items: [
            { label: 'Model Configuration', routerLink: AppConfig.routes.add.doNothing },
            { label: 'Cohort', routerLink: AppConfig.routes.add.cohort },
            { label: 'Fields', routerLink: AppConfig.routes.add.configFields },
            { label: 'Scenarios', routerLink: AppConfig.routes.add.configScenarios },
            { label: 'Curves', routerLink: AppConfig.routes.add.configCurves },
            { label: 'PoF Bands', routerLink: AppConfig.routes.add.pofBands },
            { label: 'Risk Levels', routerLink: AppConfig.routes.add.configRiskLevels },
            { label: 'Budget', routerLink: AppConfig.routes.add.configBudget },
            { label: 'Intervention Options', routerLink: AppConfig.routes.add.configInterventionOptions },
            { label: 'Rates', routerLink: AppConfig.routes.add.configRates },
            { label: 'Risk Based Decision', routerLink: AppConfig.routes.add.configRiskBasedDecision },
            { label: 'Lists', routerLink: AppConfig.routes.add.configLists },
            { label: 'List Values', routerLink: AppConfig.routes.add.configListValues }
          ]
        },
        {
          label: 'View all',
          icon:'pi pi-fw pi-external-link',
          items: [
            { label: 'Model Configuration', routerLink: AppConfig.routes.view.doNothingTable },
            { label: 'Cohort', routerLink: AppConfig.routes.view.cohortTable },
            { label: 'Fields', routerLink: AppConfig.routes.view.fieldsTable },
            { label: 'Scenarios', routerLink: AppConfig.routes.view.scenariosTable },
            { label: 'Curves', routerLink: AppConfig.routes.view.curvesTable },
            { label: 'PoF Bands', routerLink: AppConfig.routes.view.pofBandsTable },
            { label: 'Risk Levels', routerLink: AppConfig.routes.view.riskLevelsTable },
            { label: 'Budget', routerLink: AppConfig.routes.view.budgetTable },
            { label: 'Intervention Options', routerLink: AppConfig.routes.view.interventionOptionsTable },
            { label: 'Rates', routerLink: AppConfig.routes.view.ratesTable },
            { label: 'Risk Based Decision', routerLink: AppConfig.routes.view.riskBasedDecisionTable },
            { label: 'Lists', routerLink: AppConfig.routes.view.listsTable },
            { label: 'List Values', routerLink: AppConfig.routes.view.listValuesTable },
            { label: 'Run History', routerLink: AppConfig.routes.view.runHistory }
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
