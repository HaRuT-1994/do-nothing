import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import {ConfirmationService} from 'primeng/api';
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
import { CommonService } from 'src/app/services/common.service';

const view = AppConfig.routes.view;

@Component({
  selector: 'app-control-tables',
  templateUrl: './control-tables.component.html',
  styleUrls: ['./control-tables.component.scss'],
  providers: [ConfirmationService]
})
export class ControlTablesComponent implements OnInit, OnDestroy {
  @Input() needRun: boolean;
  @Input() needExport: boolean;
  @Input() needCopy = true;
  @Input() needDelete = true;
  @Input() needNew = true;
  @Output() runTriggered = new EventEmitter<void>();
  @Output() copyTriggered = new EventEmitter<void>();
  @Output() exportTriggered = new EventEmitter<void>();
  @Output() deleteTriggered = new EventEmitter<void>();

  private ref: DynamicDialogRef;
  private component: any;
  
  controlTables = [
    { label: 'Model Configuration', routerLink: view.doNothingTable, component: DoNothingComponent },
    { label: 'Cohort', routerLink: view.cohortTable, component: CohortComponent },
    { label: 'Fields', routerLink: view.fieldsTable, component: ConfigFieldsComponent },
    { label: 'Scenarios', routerLink: view.scenariosTable, component: ConfigScenariosComponent },
    { label: 'Curves', routerLink: view.curvesTable, component: ConfigCurvesComponent },
    { label: 'PoF Bands', routerLink: view.pofBandsTable, component: PofBandsComponent },
    { label: 'Risk Levels', routerLink: view.riskLevelsTable, component: RiskLevelsComponent },
    { label: 'Budget', routerLink: view.budgetTable, component: ConfigBudgetComponent },
    { label: 'Budget Years', routerLink: view.budgetYearsTable, component: BudgetYearsComponent },
    { label: 'Intervention Options', routerLink: view.interventionOptionsTable, component: ConfigInterventionOptionsComponent },
    { label: 'Rates', routerLink: view.ratesTable, component: ConfigRatesComponent },
    { label: 'Risk Based Decision', routerLink: view.riskBasedDecisionTable, component: ConfigRiskBasedDecisionsComponent },
    { label: 'Lists', routerLink: view.listsTable, component: ConfigListsComponent },
    { label: 'List Values', routerLink: view.listValuesTable, component: ConfigListValuesComponent },
    { label: 'Run History', routerLink: view.runHistory },
  ];
  selectedItem = {};

  constructor( private confirmationService: ConfirmationService,
               private location: Location,
               private router: Router,
               private commonService: CommonService) { }

  ngOnInit(): void {
    this.getSelectedTable();
  }

  selectConfig(item: any): void {
    this.component = item.component;
    this.router.navigate([item.routerLink]);
  }

  onAddConfig(): void {
    this.commonService.show(this.component, {add: true});
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
    const route = this.location.path().split('/')[1];
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
