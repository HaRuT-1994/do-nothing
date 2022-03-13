import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigRatesService } from 'src/app/do-something/services/config-rates.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ConfigData } from 'src/app/models/configData.interface';
import { CohortService } from 'src/app/services/cohort.service';
import { CommonService } from 'src/app/services/common.service';
import { ConfigScenariosService } from 'src/app/services/config-scenarios.service';

@Component({
  selector: 'app-config-rates',
  templateUrl: './config-rates.component.html',
  styleUrls: ['./config-rates.component.scss']
})
export class ConfigRatesComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({
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
    value2: new FormControl(0),
  });
  public scenarioData: ConfigData[] = [];
  public cohortData: ConfigData[] = [];
  public severity: string;
  public msg: string;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor( 
               private ratesService: ConfigRatesService,
               private commonService: CommonService,
               private cohortService: CohortService,
               private scenariosService: ConfigScenariosService,
               private location: Location) { }

  ngOnInit(): void {
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

  addConfig(): void {
    this.isLoading = true;
    this.ratesService.addConfigRates(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Config Rates Form ' +  Message.SUCCESS_MSG;
        this.commonService.deleteMsg(this);
        this.formGroup.reset();
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
    this.ratesService.onEditRate(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Rate Form ' +  Message.EDIT_SUCCESS_MSG;
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
