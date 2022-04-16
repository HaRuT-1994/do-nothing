import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ConfigData } from 'src/app/models/configData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigRiskBasedDecisionsService } from 'src/app/do-nothing/services/config-RiskBasedDecisions.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { RiskBasedDecisionModel } from 'src/app/do-nothing/models/riskBasedDecisionData.interface';

@Component({
  selector: 'app-config-risk-based-decisions',
  templateUrl: './config-risk-based-decisions.component.html',
  styleUrls: ['./config-risk-based-decisions.component.scss']
})
export class ConfigRiskBasedDecisionsComponent implements OnInit {
  public formGroup: FormGroup;
  public scenarioData: ConfigData[] = [];
  public cohortData: ConfigData[] = [];
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  private editRiskBasedDecision: RiskBasedDecisionModel[];
  
  constructor(
              private riskBasedDecisionService: ConfigRiskBasedDecisionsService,
              private commonService: CommonService,
              private lookupService: LookupService,
              private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.formInit();
    this.scenarioData = this.lookupService.configScenariosData;
    this.cohortData = this.lookupService.configCohortData;
    this.isOnEdit = !this.dialogConfig.data?.add;
    
    if (this.isOnEdit) {
      this.editRiskBasedDecision = this.riskBasedDecisionService.editRiskBasedDecision
      this.commonService.updateForm(this.formGroup, this.editRiskBasedDecision);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      scenario: new FormControl(0),
      cohort: new FormControl(0),
      poF: new FormControl(0),
      coF: new FormControl(0),
      risk: new FormControl(0),
      band: new FormControl(""),
      intervention: new FormControl(""),
      frequency: new FormControl(0)
    })
  }
  
  addConfig(): void {
    this.isLoading = true;
    this.commonService.changeToObj(this.formGroup, this.scenarioData, this.cohortData);
    this.riskBasedDecisionService.addConfigRiskBasedDecision(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Risk Based Decisions Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
        this.commonService.updateData(this.formGroup, true);
        this.editRiskBasedDecision = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editRiskBasedDecision);
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
    this.commonService.changeToObj(this.formGroup, this.scenarioData, this.cohortData);
    this.riskBasedDecisionService.onEditRiskBasedDecision(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Risk Based Decision Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
        this.commonService.updateData(this.formGroup);
        this.editRiskBasedDecision = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editRiskBasedDecision);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.commonService.deleteMsg(this);
      }
    );
  }
}
