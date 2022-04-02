import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ConfigData } from 'src/app/models/configData.interface';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { CommonService } from 'src/app/services/common.service';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { ConfigRiskBasedDecisionsService } from 'src/app/do-nothing/services/config-RiskBasedDecisions.service';

@Component({
  selector: 'app-config-risk-based-decisions',
  templateUrl: './config-risk-based-decisions.component.html',
  styleUrls: ['./config-risk-based-decisions.component.scss']
})
export class ConfigRiskBasedDecisionsComponent implements OnInit {
  public formGroup: FormGroup;
  public scenarioData: ConfigData[] = [];
  public cohortData: ConfigData[] = [];
  public severity: string;
  public msg: string;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor( 
               private riskBasedDecisionService: ConfigRiskBasedDecisionsService,
               private commonService: CommonService,
               private scenariosService: ConfigScenariosService,
               private cohortService: CohortService,
               private location: Location) { }

  ngOnInit(): void {
    this.formInit();
    this.scenariosService.getConfigScenarios().subscribe(
      (res: ConfigData[]) => {
        this.scenarioData = res;
      }
    )

    this.cohortService.getConfigCohort().subscribe(
      (res: ConfigData[]) => {        
        this.cohortData = res;
      }
    )

    this.isOnEdit = this.riskBasedDecisionService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }
    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.riskBasedDecisionService.editRiskBasedDecision);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      scenarioId: new FormControl(0),
      cohortId: new FormControl(0),
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
    this.riskBasedDecisionService.addConfigRiskBasedDecision(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Config Risk Based Decisions Form ' +  Message.SUCCESS_MSG;
        this.commonService.deleteMsg(this);
        this.formGroup.reset();
        this.formInit();
      },
      () => {
        this.isLoading = false;
        this.severity = Severity.ERROR;
        this.msg = Message.ERROR_MSG;
        this.commonService.deleteMsg(this);
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.riskBasedDecisionService.onEditRiskBasedDecision(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Risk Based Decision Form ' +  Message.EDIT_SUCCESS_MSG;
        this.commonService.deleteMsg(this);
      },
      () => {
        this.isLoading = false;
        this.severity = Severity.ERROR;
        this.msg = Message.ERROR_MSG;
        this.commonService.deleteMsg(this);
      }
    );
  }

  goBack(): void {
    this.location.back();
    this.isOnEdit = false;
  }
}
