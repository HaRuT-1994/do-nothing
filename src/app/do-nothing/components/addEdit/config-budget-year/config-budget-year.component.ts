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
  formGroup: FormGroup;
  msgDetails: MsgDetails;
  isOnEdit: boolean;
  isLoading: boolean;
  years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071];
  scenarioData: ConfigData[];
  configBudgets: BudgetModel[] = [];
  budgets = [];
  private editBudgetYear: BudgetYearsModel[];
  
  constructor(private fb: FormBuilder, private budgetYearService: ConfigBudgetYearService, private commonService: CommonService, private dialogConfig: DynamicDialogConfig, private lookupService: LookupService, private budgetService: ConfigBudgetService) {}

  ngOnInit(): void {
    this.formInit();
    this.scenarioData = this.lookupService.configScenariosData;
    this.isOnEdit = !this.dialogConfig.data?.add;
    this.getConfigBudgets();
     
    if (this.isOnEdit) {
      this.editBudgetYear = this.budgetYearService.editBudgetYears;
      this.formGroup.patchValue({
        BudgetName: this.editBudgetYear['BudgetId'],
        ScenarioName: this.editBudgetYear['Scenario'].id,
        BudgetSource: this.editBudgetYear['BudgetSource']
      })
      this.onChangeYear();
    }
  }

  private formInit(): void {
    this.formGroup = this.fb.group({
      BudgetId: [''],
      BudgetName: [''],
      ScenarioName: [''],
      BudgetSource: [''],
      year: [2022],
      budget: [0]
    })
  }

  addConfig(): void {
    this.isLoading = true;
    const form = { budgetId: this.formGroup.value.BudgetId || this.budgets[0].budgetId,
                   year: this.formGroup.value.year,
                   budget: this.formGroup.value.budget };
    
    this.budgetYearService.addConfigBudgetYear(form).subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Budget Year Form ' + Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData();
        this.formInit();
      },
      (err) => {
        console.log(err);
        
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    const form = {budgetId: this.editBudgetYear['BudgetId'], year: this.formGroup.value.year, budget: this.formGroup.value.budget };
    
    this.budgetYearService.onEditBudgetYear(form).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Budget Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData();
        this.editBudgetYear = this.formGroup.value;
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
