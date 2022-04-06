import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ConfigData } from 'src/app/models/configData.interface';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { CommonService } from 'src/app/services/common.service';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { ConfigRatesService } from 'src/app/do-nothing/services/config-rates.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';

@Component({
  selector: 'app-config-rates',
  templateUrl: './config-rates.component.html',
  styleUrls: ['./config-rates.component.scss']
})
export class ConfigRatesComponent implements OnInit {
  public formGroup: FormGroup;
  public scenarioData: ConfigData[] = [];
  public cohortData: ConfigData[] = [];
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor( 
               private ratesService: ConfigRatesService,
               private commonService: CommonService,
               private cohortService: CohortService,
               private scenariosService: ConfigScenariosService,
               private location: Location) { }

  ngOnInit(): void {
    this.formInit();
    this.cohortService.getConfigCohort().subscribe(
      (res: ConfigData[]) => {        
        this.cohortData = res;
      }
    )

    this.scenariosService.getConfigScenarios().subscribe(
      (res: ConfigData[]) => {
        this.scenarioData = res;
      }
    )

    this.isOnEdit = this.ratesService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }
    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.ratesService.editRates);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      scenarioId: new FormControl(0),
      cohortId: new FormControl(0),
      intervention: new FormControl(''),
      geography: new FormControl(''),
      budgetSource: new FormControl(''),
      value: new FormControl(0),
      rateType: new FormControl(''),
      minimumCost: new FormControl(0),
      rangeType: new FormControl(''),
      from1: new FormControl(0),
      value1: new FormControl(0),
      from2: new FormControl(0),
      value2: new FormControl(0)
    })
  }

  addConfig(): void {
    this.isLoading = true;
    this.ratesService.addConfigRates(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Rates Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
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
    this.ratesService.onEditRate(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Rate Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.commonService.deleteMsg(this);
      }
    );
  }

  goBack(): void {
    this.location.back();
    this.isOnEdit = false;
  }
}
