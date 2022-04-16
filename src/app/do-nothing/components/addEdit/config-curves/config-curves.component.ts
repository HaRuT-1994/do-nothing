import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigCurvesService } from 'src/app/do-nothing/services/config-curves.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CurveModel } from 'src/app/do-nothing/models/curveData.interface';

@Component({
  selector: 'app-config-curves',
  templateUrl: './config-curves.component.html',
  styleUrls: ['./config-curves.component.scss']
})
export class ConfigCurvesComponent implements OnInit {
 public  formGroup: FormGroup;
  public isOnEdit: boolean;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public cohortData: ConfigData[] = [];
  public scenarioData: ConfigData[] = [];
  public editCurves: CurveModel[] = [];
  // private selectedScenario = this.editCurves['scenario'].id;

  constructor(private curvesService: ConfigCurvesService, private commonService: CommonService,
    private cohortService: CohortService, private configScenariosService: ConfigScenariosService, private dialogConfig: DynamicDialogConfig, private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.formInit();
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
    this.isOnEdit = !this.dialogConfig.data?.add;

    if (this.isOnEdit) {
      this.editCurves = this.curvesService.editCurves;
      this.commonService.updateForm(this.formGroup, this.editCurves);
    }
  }

  formInit(): void {
    this.formGroup = this.formBuilder.group({
      scenario: [''],
      cohort: [''],
      calculation: [''],
      poFCurve: [0],
      poFNav: [0],
      healthCurve: [0],
      healthNav: [0],
      pofConstant: [0],
      healthConstant: [0]
    })
  }

  addConfig(): void {
    this.isLoading = true;
    this.commonService.changeToObj(this.formGroup, this.scenarioData, this.cohortData);
    this.curvesService.addConfigCurves(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Curve Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
        this.commonService.updateData(this.formGroup, true)
        this.editCurves = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editCurves);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR}
        this.commonService.deleteMsg(this);
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.commonService.changeToObj(this.formGroup, this.scenarioData, this.cohortData);
    this.curvesService.onEditCurve(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Curves Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
        this.commonService.updateData(this.formGroup);
        this.editCurves = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editCurves);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR}
        this.commonService.deleteMsg(this);
      }
    );
  }
}