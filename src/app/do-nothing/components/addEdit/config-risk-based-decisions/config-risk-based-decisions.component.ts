import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ConfigData } from 'src/app/models/configData.interface';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { CommonService } from 'src/app/services/common.service';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { ConfigRiskBasedDecisionsService } from 'src/app/do-nothing/services/config-RiskBasedDecisions.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

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
  
  constructor(
              private riskBasedDecisionService: ConfigRiskBasedDecisionsService,
              private commonService: CommonService,
              private configScenariosService: ConfigScenariosService,
              private cohortService: CohortService,
              private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.formInit();
    this.isOnEdit = !this.dialogConfig.data?.add;

    this.configScenariosService.getConfigScenarios().subscribe(
      (res: ConfigData[]) => this.scenarioData = res
    );
    this.cohortService.getConfigCohort().subscribe(
      (res: ConfigData[]) => {
        this.cohortData = res;
      }
    )

    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.riskBasedDecisionService.editRiskBasedDecision);
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
    this.changeToObj();
    this.riskBasedDecisionService.addConfigRiskBasedDecision(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Risk Based Decisions Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
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
    this.riskBasedDecisionService.onEditRiskBasedDecision(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Risk Based Decision Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.commonService.deleteMsg(this);
      }
    );
  }

  private changeToObj() {
    let scenario = this.scenarioData.filter(item => item.id === this.formGroup.get('scenario').value);
    let cohort = this.cohortData.filter(item => item.id === this.formGroup.get('cohort').value);

    this.formGroup.patchValue({
      scenario: scenario[0],
      cohort: cohort[0]
    })
  }
}
