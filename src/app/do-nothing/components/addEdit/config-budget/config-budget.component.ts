import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigBudgetService } from 'src/app/do-nothing/services/config-budget.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { BudgetModel } from 'src/app/do-nothing/models/budgetData.interface';

@Component({
  selector: 'app-config-budget',
  templateUrl: './config-budget.component.html',
  styleUrls: ['./config-budget.component.scss']
})
export class ConfigBudgetComponent implements OnInit {
  formGroup: FormGroup;
  scenarioData: ConfigData[];
  msgDetails: MsgDetails;
  isOnEdit: boolean;
  isLoading: boolean;
  private editBudget: BudgetModel[];
  
  constructor( 
               private budgetService: ConfigBudgetService,
               private commonService: CommonService,
               private lookupService: LookupService,
               private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.formInit();
    this.isOnEdit = !this.dialogConfig.data?.add;
    this.scenarioData = this.lookupService.configScenariosData;
  
    if (this.isOnEdit) {
      this.editBudget = this.budgetService.editBudget;
      this.commonService.updateForm(this.formGroup, this.editBudget);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      scenario: new FormControl(''),
      budgetName: new FormControl(''),
      exceedanceAllowance: new FormControl(0),
      budgetSource: new FormControl('')
    })
  }

  addConfig(): void {
    this.isLoading = true;
    this.commonService.changeToObj(this.formGroup, this.scenarioData);
    this.budgetService.addConfigBudget(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Budget Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData()
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
    this.commonService.changeToObj(this.formGroup, this.scenarioData);
    this.budgetService.onEditBudget(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Budget Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData();
        this.editBudget = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editBudget);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }
}
