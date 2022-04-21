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
import { DoNothingService } from 'src/app/do-nothing/services/do-nothing.service';

@Component({
  selector: 'app-control-tables',
  templateUrl: './control-tables.component.html',
  styleUrls: ['./control-tables.component.scss'],
  providers: [ConfirmationService, DialogService]
})
export class ControlTablesComponent implements OnInit, OnDestroy {
  @Input() path: string;
  @Input() needRun: boolean;
  private ref: DynamicDialogRef;
  private component: any;
  public controlTables = [
    { label: 'Model Configuration', routerLink: AppConfig.routes.view.doNothingTable },
    { label: 'Cohort', routerLink: AppConfig.routes.view.cohortTable },
    { label: 'Fields', routerLink: AppConfig.routes.view.fieldsTable },
    { label: 'Scenarios', routerLink: AppConfig.routes.view.scenariosTable },
    { label: 'Curves', routerLink: AppConfig.routes.view.curvesTable },
    { label: 'PoF Bands', routerLink: AppConfig.routes.view.pofBandsTable },
    { label: 'Risk Levels', routerLink: AppConfig.routes.view.riskLevelsTable },
    { label: 'Budget', routerLink: AppConfig.routes.view.budgetTable },
    { label: 'Budget Years', routerLink: AppConfig.routes.view.budgetYearsTable },
    { label: 'Intervention Options', routerLink: AppConfig.routes.view.interventionOptionsTable },
    { label: 'Rates', routerLink: AppConfig.routes.view.ratesTable },
    { label: 'Risk Based Decision', routerLink: AppConfig.routes.view.riskBasedDecisionTable },
    { label: 'Lists', routerLink: AppConfig.routes.view.listsTable },
    { label: 'List Values', routerLink: AppConfig.routes.view.listValuesTable },
    { label: 'Run History', routerLink: AppConfig.routes.view.runHistory },
  ];
  public label = '';
  @Output() runTriggered = new EventEmitter<void>();

  constructor( private confirmationService: ConfirmationService,
               private dialogService: DialogService,
               private location: Location,
               private doNothingService: DoNothingService) { }

  ngOnInit(): void {
    this.getComponentName();
  }

  onAddConfig(): void {
    // this.confirmationService.confirm({
    //     message: 'Add New config?',
    //     header: 'Confirmation',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
          this.show();
    //     }
    // });
  }

  private show(): void {
    this.getComponentName();
    this.ref = this.dialogService.open( this.component, {
        data: {add: true},
        width: '80%',
        contentStyle: {"max-height": "800px", "overflow": "auto"},
        baseZIndex: 10001,
    });

    this.ref.onClose.subscribe((product: any) =>{ });
  }

  public runModel(): void {
    this.confirmationService.confirm({
      message: 'Run checked models?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.runTriggered.emit();
      }
    });
  }

  private getComponentName(): void {
    switch(this.location.path().split('/')[1]) {
      case 'model-table':
        this.component = DoNothingComponent;
        this.label = this.controlTables[0].label;
        break;
      case 'cohort-table':
        this.component = CohortComponent;
        this.label = this.controlTables[1].label;
        break;
      case 'fields-table':
        this.component = ConfigFieldsComponent;
        this.label = this.controlTables[2].label;
        break;
      case 'scenarios-table':
        this.component = ConfigScenariosComponent;
        this.label = this.controlTables[3].label;
        break;
      case 'curves-table':
        this.component = ConfigCurvesComponent;
        this.label = this.controlTables[4].label;
        break;
      case 'pof-bands-table':
        this.component = PofBandsComponent;
        this.label = this.controlTables[5].label;
        break;
      case 'risk-levels-table':
        this.component = RiskLevelsComponent;
        this.label = this.controlTables[6].label;
        break;
      case 'budget-table':
        this.component = ConfigBudgetComponent;
        this.label = this.controlTables[7].label;
        break;
        case 'budget-years-table':
          this.component = BudgetYearsComponent;
          this.label = this.controlTables[8].label;
          break;
      case 'intervention-options-table':
        this.component = ConfigInterventionOptionsComponent;
        this.label = this.controlTables[9].label;
        break;
      case 'rates-table':
        this.component = ConfigRatesComponent;
        this.label = this.controlTables[10].label;
        break;
      case 'risk-based-decision-table':
        this.component = ConfigRiskBasedDecisionsComponent;
        this.label = this.controlTables[11].label;
        break;
      case 'lists-table':
        this.component = ConfigListsComponent;
        this.label = this.controlTables[12].label;
        break;
      case 'list-values-table':
        this.component = ConfigListValuesComponent;
        this.label = this.controlTables[13].label;
        break;
      case 'run-history-table':
        this.label = this.controlTables[14].label;
        break;
      default:
        this.component = DoNothingComponent;
        this.label = this.controlTables[0].label;
    }
  }

  goBack(): void{
    this.location.back();
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
