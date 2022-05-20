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
import { ConfigListValuesService } from 'src/app/do-nothing/services/config-listValues.service';
import { ListId } from 'src/app/do-nothing/enums/listId.enum';

@Component({
  selector: 'app-config-risk-based-decisions',
  templateUrl: './config-risk-based-decisions.component.html',
  styleUrls: ['./config-risk-based-decisions.component.scss']
})
export class ConfigRiskBasedDecisionsComponent implements OnInit {
  formGroup: FormGroup;
  scenarioData: ConfigData[] = [];
  cohortData: ConfigData[] = [];
  msgDetails: MsgDetails;
  isOnEdit: boolean;
  isLoading: boolean;
  pofValues = [1,2,3,4,5];
  listValues: string[] = [];
  private editRiskBasedDecision: RiskBasedDecisionModel[];
  
  constructor(
              private riskBasedDecisionService: ConfigRiskBasedDecisionsService,
              private commonService: CommonService,
              private lookupService: LookupService,
              private dialogConfig: DynamicDialogConfig,
              private listValuesService: ConfigListValuesService) { }

  ngOnInit(): void {
    this.formInit();
    this.scenarioData = this.lookupService.configScenariosData;
    this.cohortData = this.lookupService.configCohortData;
    this.listValuesService.getListValuesByListId(ListId.FOUR).subscribe(res => this.listValues = res)
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
      poF: new FormControl(1),
      coF: new FormControl(1),
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
        this.commonService.updateData();
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
    this.commonService.changeToObj(this.formGroup, this.scenarioData, this.cohortData);
    this.riskBasedDecisionService.onEditRiskBasedDecision(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Risk Based Decision Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData();
        this.editRiskBasedDecision = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editRiskBasedDecision);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }
}
