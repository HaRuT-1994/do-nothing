import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigBudgetService } from 'src/app/do-nothing/services/config-budget.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-config-budget',
  templateUrl: './config-budget.component.html',
  styleUrls: ['./config-budget.component.scss']
})
export class ConfigBudgetComponent implements OnInit {
  public formGroup: FormGroup;
  public scenarioData: ConfigData[] = [];
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor( 
               private budgetService: ConfigBudgetService,
               private commonService: CommonService,
               private scenariosService: ConfigScenariosService,
               private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.formInit();
    this.isOnEdit = !this.dialogConfig.data?.add;

    this.scenariosService.getConfigScenarios().subscribe(
      (res: ConfigData[]) => this.scenarioData = res
    );
  
    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.budgetService.editBudget);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      scenario: new FormControl(0),
      scenarioName: new FormControl(''),
      expLimit: new FormControl(0),
      year: new FormControl(0),
      budget: new FormControl(0),
      budgetSource: new FormControl('')
    })
  }

  addConfig(): void {
    this.isLoading = true;
    // this.changeToObj();
    this.budgetService.addConfigBudget(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Budget Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
        this.formGroup.reset();
        this.formInit();
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.commonService.deleteMsg(this);
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.budgetService.onEditBudget(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Budget Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.commonService.deleteMsg(this);
      }
    );
  }
}
