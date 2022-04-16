import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigBudgetYearService } from 'src/app/do-nothing/services/config-budget-year.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-config-budget-year',
  templateUrl: './config-budget-year.component.html',
  styleUrls: ['./config-budget-year.component.scss']
})
export class ConfigBudgetYearComponent implements OnInit {
  public formGroup: FormGroup;
  //public scenarioData: ConfigData[] = [];
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor(private fb: FormBuilder, private configBudgetYearService: ConfigBudgetYearService, private commonService: CommonService, private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.formInit();

    this.isOnEdit = !this.dialogConfig.data?.add;
  }

  private formInit(): void {
    this.formGroup = this.fb.group({
      id: [0],
      budgetId: [0],
      year: [0],
      budget: [0]
    })
  }

  addConfig(): void {
    this.isLoading = true;
    this.configBudgetYearService.addConfigBudget(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Budget Year Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
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

}
