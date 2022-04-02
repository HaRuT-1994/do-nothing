import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';

@Component({
  selector: 'app-control-tables',
  templateUrl: './control-tables.component.html',
  styleUrls: ['./control-tables.component.scss']
})
export class ControlTablesComponent implements OnInit {
  @Input() path: string;
  controlTables = [
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onAddConfig() {
    if(confirm('Are you sure about adding config?')){
      this.router.navigate([this.path]);
    }
  }
}
