import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoNothingService } from 'src/app/do-nothing/services/do-nothing.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { ModelConfig } from 'src/app/do-nothing/models/modelConfig.interface';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';

@Component({
  selector: 'app-do-nothing',
  templateUrl: './do-nothing.component.html',
  styleUrls: ['./do-nothing.component.scss']
})
export class DoNothingComponent implements OnInit {
  public formGroup: FormGroup;
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  public submitted: boolean;
  public skipTheseLifecycles: ConfigData[];
  public skipTheseAssetSources: ConfigData[] = [];
  public skipTheseUnitClasses: ConfigData[] = [];
  public scenarioData: ConfigData[] = [];
  public conditionRange = ['1 to 5', '1 to 10'];
  private editModel: ModelConfig[] = [];

  constructor( private doNothingService: DoNothingService,
               private commonService: CommonService,
               private lookupService: LookupService,
               private dialogConfig: DynamicDialogConfig,
               private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formInit();
    this.skipTheseLifecycles = this.lookupService.skipTheseLifecycles;
    this.skipTheseAssetSources = this.lookupService.skipTheseAssetSources;
    this.skipTheseUnitClasses = this.lookupService.skipTheseUnitClasses;
    
    this.scenarioData = this.lookupService.configScenariosData;
    this.isOnEdit = !this.dialogConfig.data?.add;

    if (this.isOnEdit) {
      this.editModel = this.doNothingService.editModel;
      this.commonService.updateForm(this.formGroup, this.editModel);
      const scenarios = this.doNothingService.strToArray(this.editModel['scenariosToRun']);
      
      this.formGroup.patchValue({
        scenariosToRun: scenarios,
        skipTheseLifecycle: this.editModel['skipTheseLifecycle'].split(","),
        skipTheseAssetSources: this.editModel['skipTheseAssetSources'].split(","),
        skipTheseUnitClasses: this.editModel['skipTheseUnitClasses'].split(",")
      })
    }
  }

  formInit(): void {
    this.formGroup = this.formBuilder.group({
      modelName: ['', Validators.required],
      baseYear: [0, Validators.required],
      yearsToRun: [0, Validators.required],
      skipTheseLifecycle: [''],
      skipTheseAssetSources: [''],
      skipTheseUnitClasses: [''],
      scenariosToRun: ['', Validators.required],
      conditionRange: [''],
      dataModelOutputTemplate: [''],
      nrModelColumns: [0],
      // unitsAndComponentsSeparated: new FormControl(true),
      // firstPastPostOption: new FormControl(true),
      debugMode: [true],
      allowOverwriteToExceedBudget: [true],
      allowSurplusBudgetRollover: [true],
    });
  }

  addConfig(): void {
    if(this.formGroup.valid) {
      this.isLoading = true;
      this.doNothingService.arrToString(['skipTheseLifecycle', 'skipTheseAssetSources', 'skipTheseUnitClasses', 'scenariosToRun'], this.formGroup);
      this.doNothingService.addDoNothing(this.formGroup.value).subscribe(
        () => {
          this.isLoading = false;
          this.msgDetails = {msg: 'Model Configuration Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
          this.commonService.updateData(true);
          this.formInit();
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      );
    } else {
      this.submitted = true;
    }
  }

  editConfig(): void {
    if(this.formGroup.valid) {
      this.isLoading = true;
      this.doNothingService.arrToString(['skipTheseLifecycle', 'skipTheseAssetSources', 'skipTheseUnitClasses', 'scenariosToRun'], this.formGroup);
      this.doNothingService.onEditModelConfig(this.formGroup.value).subscribe(
        () => {
          this.isLoading = false;
          this.msgDetails = {msg: 'Model Configurarion Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
          this.commonService.updateData(this.formGroup);
          this.editConfig = this.formGroup.value;
          this.commonService.updateForm(this.formGroup, this.editConfig);
        },
        () => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      );
    } else {
      this.submitted = true;
    }
  }
}