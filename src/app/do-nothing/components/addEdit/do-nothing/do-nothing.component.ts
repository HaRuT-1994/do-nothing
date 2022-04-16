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
  public skipTheseLifecycles: ConfigData[] = [];
  private selectedLifecycles: number[];
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
    this.selectedLifecycles = this.separateIdfromObj(this.skipTheseLifecycles);
    this.formInit();
    this.isOnEdit = !this.dialogConfig.data?.add;
    this.skipTheseLifecycles = this.lookupService.skipTheseLifecycles;
    this.skipTheseAssetSources = this.lookupService.skipTheseAssetSources;
    this.skipTheseUnitClasses = this.lookupService.skipTheseUnitClasses;
    this.scenarioData = this.lookupService.configScenariosData;

    if (this.isOnEdit) {
      this.editModel = this.doNothingService.editModel;
      //this.skipTheseLifecycles = [{id: 1856486, value: 'Disposed'}]
      //this.strToArray(['skipTheseLifecycle', 'skipTheseAssetSources', 'skipTheseUnitClasses' ]);
      //this.separateIdfromObj(this.skipTheseLifecycles)
      this.editModel['skipTheseLifecycle'] = this.selectedLifecycles;
      console.log(this.formGroup, this.editModel, this.skipTheseLifecycles, this.separateIdfromObj(this.skipTheseLifecycles));
      //this.commonService.updateForm(this.formGroup, this.editModel);
    }
  }

  formInit(): void {
    this.formGroup = this.formBuilder.group({
      modelName: ['WTP', Validators.required],
      baseYear: [2021, Validators.required],
      yearsToRun: [20, Validators.required],
      skipTheseLifecycle: [this.selectedLifecycles],
      skipTheseAssetSources: [''],
      skipTheseUnitClasses: [''],
      scenariosToRun: [[1]],
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
      this.arrToString(['skipTheseLifecycle', 'skipTheseAssetSources', 'skipTheseUnitClasses', 'scenariosToRun']);
      
      this.doNothingService.addDoNothing(this.formGroup.value).subscribe(
        () => {
          this.isLoading = false;
          this.msgDetails = {msg: 'Model Configuration Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
          this.commonService.deleteMsg(this);
          this.formGroup.reset();
          this.formInit();
        },
        err => {
          this.isLoading = false;
          console.log(err);
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
          this.commonService.deleteMsg(this);
        }
      );
    }
  }

  editConfig(): void {
    if(this.formGroup.valid) {
      this.isLoading = true;
      this.arrToString(['skipTheseLifecycle', 'skipTheseAssetSources', 'skipTheseUnitClasses', 'scenariosToRun', 'conditionRange']);

      this.doNothingService.onEditModelConfig(this.formGroup.value).subscribe(
        () => {
          this.isLoading = false;
          this.msgDetails = {msg: 'Model Configurarion Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
          this.commonService.deleteMsg(this);
        },
        () => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
          this.commonService.deleteMsg(this);
        }
      );
    }
  }

  private arrToString(data: string[]) {
    data.forEach(i => this.formGroup.value[i] = this.formGroup.value[i].toString());
  }

  private strToArray(data: string[]) {
    data.forEach(i => this.editModel[i] = this.editModel[i].split(",") );
  }

  private separateIdfromObj(data: ConfigData[]): number[] {
    let arr = [];
    console.log(this.editModel['skipTheseLifecycle']);
    data.forEach(obj => {
      
      
      this.editModel['skipTheseLifecycle'].split(',').forEach(item => {
        if(item === obj.value) {
          arr.push(obj.id);
        }
      })
    })

    return arr;
  } 
}