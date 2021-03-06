import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigCurvesService } from 'src/app/do-nothing/services/config-curves.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CurveModel } from 'src/app/do-nothing/models/curveData.interface';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { ConfigListValuesService } from 'src/app/do-nothing/services/config-listValues.service';
import { ListId } from 'src/app/do-nothing/enums/listId.enum';

@Component({
  selector: 'app-config-curves',
  templateUrl: './config-curves.component.html',
  styleUrls: ['./config-curves.component.scss']
})
export class ConfigCurvesComponent implements OnInit {
  formGroup: FormGroup;
  isOnEdit: boolean;
  isLoading: boolean;
  msgDetails: MsgDetails;
  cohortData: ConfigData[];
  scenarioData: ConfigData[];
  private editCurves: CurveModel[];
  public listValues: string[];

  constructor(private curvesService: ConfigCurvesService, private commonService: CommonService,
    private lookupService: LookupService, private dialogConfig: DynamicDialogConfig, private fb: FormBuilder, private listValuesService: ConfigListValuesService) { }

  ngOnInit() {
    this.formInit();
    this.cohortData = this.lookupService.configCohortData;
    this.scenarioData = this.lookupService.configScenariosData;
    this.listValuesService.getListValuesByListId(ListId.SEVEN).subscribe(res => this.listValues = res)
    
    this.isOnEdit = !this.dialogConfig.data?.add;

    if (this.isOnEdit) {
      this.editCurves = this.curvesService.editCurves;
      this.commonService.updateForm(this.formGroup, this.editCurves);
    }
  }

  formInit(): void {
    this.formGroup = this.fb.group({
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
        this.msgDetails = {msg: 'Curve Form ' + Message.SUCCESS_MSG, severity: Severity.SUCCESS};
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
    this.curvesService.onEditCurve(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Curves Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData();
        this.editCurves = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editCurves);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }
}