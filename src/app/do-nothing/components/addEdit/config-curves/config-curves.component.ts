import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigCurvesService } from 'src/app/do-nothing/services/config-curves.service';
import { Severity } from 'src/app/do-nothing/enums/severity.enum';
import { Message } from 'src/app/do-nothing/enums/message.enum';
import { CommonService } from 'src/app/do-nothing/services/common.service';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { ConfigData } from 'src/app/do-nothing/models/configData.interface';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
  public isOnEdit: boolean;
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public cohortData: ConfigData[] = [];
  public scenarioData: ConfigData[] = [];

  constructor(private curvesService: ConfigCurvesService, private commonService: CommonService,
    private cohortService: CohortService, private configScenariosService: ConfigScenariosService, private router: Router,
    private location: Location) { }

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

    this.isOnEdit = this.curvesService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }

    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.curvesService.editCurves)  
    }
  }

  addConfig(): void {
    this.isLoading = true;
    this.curvesService.addConfigCurves(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Curve Form ' +  Message.SUCCESS_MSG;
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
    this.curvesService.onEditCurve(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Curves Form ' +  Message.EDIT_SUCCESS_MSG;
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