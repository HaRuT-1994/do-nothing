import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ConfigData } from 'src/app/models/configData.interface';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { CommonService } from 'src/app/services/common.service';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { ConfigInterventionOptionsService } from 'src/app/do-nothing/services/config-InterventionOptions.service';

@Component({
  selector: 'app-config-intervention-options',
  templateUrl: './config-intervention-options.component.html',
  styleUrls: ['./config-intervention-options.component.scss']
})
export class ConfigInterventionOptionsComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({
    scenarioId: new FormControl(0),
    cohortId: new FormControl(0),
    intervention: new FormControl(''),
    available: new FormControl(true),
    reset: new FormControl(''),
    applyWhenMlc: new FormControl(0),
    excludeIfCrc: new FormControl(''),
    forceReplace: new FormControl(true),
    whenAlc: new FormControl(0),
    replaceWithCohortId: new FormControl(0),
  });
  public scenarioData: ConfigData[] = [];
  public cohortData: ConfigData[] = [];
  public severity: string;
  public msg: string;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor( 
               private interventionOptionsService: ConfigInterventionOptionsService,
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

    this.isOnEdit = this.interventionOptionsService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }
    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.interventionOptionsService.editInterventionOptions);
    }
  }

  addConfig(): void {
    this.isLoading = true;
    this.interventionOptionsService.addConfigInterventionOptions(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Config Intervention Options Form ' +  Message.SUCCESS_MSG;
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
    this.interventionOptionsService.onEditInterventionOption(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Intervention Options Form ' +  Message.EDIT_SUCCESS_MSG;
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
