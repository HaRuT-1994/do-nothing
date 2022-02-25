import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigCurvesService } from 'src/app/services/config-curves.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { CohortService } from 'src/app/services/cohort.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { ConfigScenariosService } from 'src/app/services/config-scenarios.service';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-config-curves',
  templateUrl: './config-curves.component.html',
  styleUrls: ['./config-curves.component.scss']
})
export class ConfigCurvesComponent implements OnInit {
 public  formGroup: FormGroup = new FormGroup({
    scenarioId: new FormControl(0),
    cohortId: new FormControl(0),
    calculation: new FormControl(''),
    poFCurve: new FormControl(0),
    poFNav: new FormControl(0),
    healthCurve: new FormControl(0),
    healthNav: new FormControl(0),
    pofConstant: new FormControl(0),
    healthConstant: new FormControl(0),
  });
  
  public severity = '';
  public msg = '';
  cohortData: ConfigData[] = [];
  scenarioData: ConfigData[] = [];

  constructor(private configCurvesService: ConfigCurvesService, private commonService: CommonService,
    private cohortService: CohortService, private configScenariosService: ConfigScenariosService) { }

  ngOnInit() {
    this.cohortService.getConfigCohort().subscribe(
      (res: ConfigData[]) => {        
        this.cohortData = res;
      }
    )

    this.configScenariosService.getConfigScenarios().subscribe(
      (res: ConfigData[]) => {
        this.scenarioData = res;
      }
    )
  }

  onSubmit() {      
    this.configCurvesService.addConfigCurves(this.formGroup.value).subscribe(
      () => {
        this.severity = Severity.SUCCESS;
        this.msg = 'Curves Form ' + Message.SUCCESS_MSG;
        this.commonService.deleteMsg(this);
      },
      err => { 
        console.log(err);
        this.severity = Severity.ERROR;
        this.msg = Message.ERROR_MSG;
        this.commonService.deleteMsg(this);
      }
    );
  }
}