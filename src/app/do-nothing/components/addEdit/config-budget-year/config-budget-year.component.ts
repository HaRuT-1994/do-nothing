import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BudgetModel } from 'src/app/do-nothing/models/budgetData.interface';
import { BudgetYearsModel } from 'src/app/do-nothing/models/budgetYearsData.interface';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigBudgetYearService } from 'src/app/do-nothing/services/config-budget-year.service';
import { ConfigBudgetService } from 'src/app/do-nothing/services/config-budget.service';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ConfigData } from 'src/app/models/configData.interface';
import { CommonService } from 'src/app/services/common.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-config-budget-year',
  templateUrl: './config-budget-year.component.html',
  styleUrls: ['./config-budget-year.component.scss']
})
export class BudgetYearsComponent implements OnInit {
  public formGroup: FormGroup;
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  public years = [];
  private editBudgetYear: BudgetYearsModel[];
  public scenarioData: ConfigData[];
  public configBudgets: BudgetModel[] = [];
  public budgets = [];
  
  constructor(private fb: FormBuilder, private budgetYearService: ConfigBudgetYearService, private commonService: CommonService, private dialogConfig: DynamicDialogConfig, private lookupService: LookupService, private budgetService: ConfigBudgetService) {}

  ngOnInit(): void {
    this.formInit();
    // this.formGroup.reset();
    // this.commonService.updateForm(this.formGroup, this.editBudgetYear)
    this.scenarioData = this.lookupService.configScenariosData;
    this.isOnEdit = !this.dialogConfig.data?.add;
    this.getConfigBudgets();

    if (this.isOnEdit) {
      for(let i = 2022; i <= 2071; i++) {
        this.years.push(i);
      }
      this.editBudgetYear = this.budgetYearService.editBudgetYears;
      this.formGroup.patchValue({
        BudgetName: this.editBudgetYear['BudgetId'],
        ScenarioName: this.editBudgetYear['Scenario'].id,
        BudgetSource: this.editBudgetYear['BudgetSource']
      })
    }
  }

  private formInit(): void {
    this.formGroup = this.fb.group({
      BudgetId: [''],
      BudgetName: [''],
      ScenarioName: [''],
      BudgetSource: [''],
      year: [0],
      budget: [0]
    })
  }

  addConfig(): void {
    this.isLoading = true;
    const form = { BudgetId: this.formGroup.value.BudgetId,
                   year: this.formGroup.value.year,
                   budget: this.formGroup.value.budget };
    this.budgetYearService.addConfigBudgetYear(form).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Budget Year Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData(true)
        this.formInit();
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    const form = {BudgetId: this.editBudgetYear['BudgetId'], year: this.formGroup.value.year, budget: this.formGroup.value.budget };
    this.budgetYearService.onEditBudgetYear(form).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Budget Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData(this.formGroup);
        this.editBudgetYear = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editBudgetYear);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }

  private getConfigBudgets(): void {
    this.isLoading = true;
    this.budgetService.getAllBudgets().pipe(
      map(res => {
        this.budgets = [];
        this.scenarioData = [];
        res.forEach(item => {
          this.budgets.push({'budgetId': item.budgetId, 'budgetName': item.budgetName });
           this.scenarioData.push(item.scenario);
        })
        return res;
      })
    ).subscribe(
      (res) => {
        this.isLoading = false;
        this.configBudgets = [];
        this.configBudgets = res;
      },
      err => {
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.isLoading = false;
      }
    )
  }

  onChangeYear(): void {
    const budget = this.editBudgetYear[`_${this.formGroup.get('year').value}`]
    this.formGroup.patchValue({ budget });
  }

  onChangeBudgetName(id: number): void {
    const selectedBudget = this.configBudgets.filter(i => i.budgetId === id)[0];
    this.formGroup.patchValue({ 
      ScenarioName: selectedBudget.scenario.id,
      BudgetSource: selectedBudget.budgetSource,
      BudgetId: selectedBudget.budgetId
     });
  }
}
