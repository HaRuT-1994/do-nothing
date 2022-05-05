import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import {ConfirmationService} from 'primeng/api';

import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { CohortComponent } from '../../addEdit/cohort/cohort.component';
import { Location } from '@angular/common';
import { DoNothingComponent } from '../../addEdit/do-nothing/do-nothing.component';
import { ConfigFieldsComponent } from '../../addEdit/config-fields/config-fields.component';
import { ConfigScenariosComponent } from '../../addEdit/config-scenarios/config-scenarios.component';
import { ConfigCurvesComponent } from '../../addEdit/config-curves/config-curves.component';
import { PofBandsComponent } from '../../addEdit/pof-bands/pof-bands.component';
import { RiskLevelsComponent } from '../../addEdit/risk-levels/risk-levels.component';
import { ConfigInterventionOptionsComponent } from '../../addEdit/config-intervention-options/config-intervention-options.component';
import { ConfigRatesComponent } from '../../addEdit/config-rates/config-rates.component';
import { ConfigRiskBasedDecisionsComponent } from '../../addEdit/config-risk-based-decisions/config-risk-based-decisions.component';
import { ConfigListsComponent } from '../../addEdit/config-lists/config-lists.component';
import { ConfigListValuesComponent } from '../../addEdit/config-list-values/config-list-values.component';
import { BudgetYearsComponent } from '../../addEdit/config-budget-year/config-budget-year.component';
import { ConfigBudgetComponent } from '../../addEdit/config-budget/config-budget.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-tables',
  templateUrl: './control-tables.component.html',
  styleUrls: ['./control-tables.component.scss'],
  providers: [ConfirmationService, DialogService]
})
export class ControlTablesComponent implements OnInit, OnDestroy {
  @Input() path: string;
  @Input() needRun: boolean;
  @Input() needCopy = true;
  @Input() needDelete = true;
  @Input() needNew = true;
  private ref: DynamicDialogRef;
  private component: any;
  public controlTables = [
    { label: 'Model Configuration', routerLink: AppConfig.routes.view.doNothingTable, component: DoNothingComponent },
    { label: 'Cohort', routerLink: AppConfig.routes.view.cohortTable, component: CohortComponent },
    { label: 'Fields', routerLink: AppConfig.routes.view.fieldsTable, component: ConfigFieldsComponent },
    { label: 'Scenarios', routerLink: AppConfig.routes.view.scenariosTable, component: ConfigScenariosComponent },
    { label: 'Curves', routerLink: AppConfig.routes.view.curvesTable, component: ConfigCurvesComponent },
    { label: 'PoF Bands', routerLink: AppConfig.routes.view.pofBandsTable, component: PofBandsComponent },
    { label: 'Risk Levels', routerLink: AppConfig.routes.view.riskLevelsTable, component: RiskLevelsComponent },
    { label: 'Budget', routerLink: AppConfig.routes.view.budgetTable, component: ConfigBudgetComponent },
    { label: 'Budget Years', routerLink: AppConfig.routes.view.budgetYearsTable, component: BudgetYearsComponent },
    { label: 'Intervention Options', routerLink: AppConfig.routes.view.interventionOptionsTable, component: ConfigInterventionOptionsComponent },
    { label: 'Rates', routerLink: AppConfig.routes.view.ratesTable, component: ConfigRatesComponent },
    { label: 'Risk Based Decision', routerLink: AppConfig.routes.view.riskBasedDecisionTable, component: ConfigRiskBasedDecisionsComponent },
    { label: 'Lists', routerLink: AppConfig.routes.view.listsTable, component: ConfigListsComponent },
    { label: 'List Values', routerLink: AppConfig.routes.view.listValuesTable, component: ConfigListValuesComponent },
    { label: 'Run History', routerLink: AppConfig.routes.view.runHistory },
  ];
  public selectedItem = {};
  @Output() runTriggered = new EventEmitter<void>();
  @Output() copyTriggered = new EventEmitter<void>();
  @Output() deleteTriggered = new EventEmitter<void>();

  constructor( private confirmationService: ConfirmationService,
               private dialogService: DialogService,
               private location: Location,
               private router: Router) { }

  ngOnInit(): void {
    this.getSelectedTable();
  }

  selectConfig(item: any): void {
    this.component = item.component;
    this.router.navigate([item.routerLink]);
  }

  onAddConfig(): void {
    this.show();
  }

  private show(): void {
    this.ref = this.dialogService.open( this.component, {
        data: {add: true},
        width: '80%',
        contentStyle: {"max-height": "800px", "overflow": "auto"},
        baseZIndex: 10001,
    });
  }

  runModel(): void {
    this.confirmationService.confirm({
      message: 'Run checked models?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.runTriggered.emit();
      }
    });
  }

  copyConfigs(): void {
    this.confirmationService.confirm({
      message: 'Copy checked?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.copyTriggered.emit();
      }
    });
  }

  deleteConfigs(): void {
    this.confirmationService.confirm({
      message: 'Delete checked?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTriggered.emit();
      }
    });
  }

  private getSelectedTable(): void {
    const route =  this.location.path().split('/')[1];
    const selectedTable = this.controlTables.filter( item => item.routerLink === route);
    this.component = selectedTable[0].component;
    this.selectedItem = selectedTable[0];
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
