import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoNothingService } from 'src/app/do-nothing/services/do-nothing.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { Location } from '@angular/common';
import { ModelConfig } from 'src/app/do-nothing/models/modelConfig.interface';

@Component({
  selector: 'app-do-nothing',
  templateUrl: './do-nothing.component.html',
  styleUrls: ['./do-nothing.component.scss']
})
export class DoNothingComponent implements OnInit {
  public formGroup: FormGroup;
  public severity: string;
  public msg: string;
  public isOnEdit: boolean;
  public isLoading: boolean;
  public skipTheseLifecycles: ConfigData[] = [];
  public skipTheseAssetSources: ConfigData[] = [];
  public skipTheseUnitClasses: ConfigData[] = [];
  public scenariosToRun: ConfigData[] = []; 
  public conditionRange = ['1 to 5', '1 to 10'];
  private editModel: ModelConfig[] = [];

  constructor( private doNothingService: DoNothingService,
               private commonService: CommonService,
               private configScenariosService: ConfigScenariosService,
               private location: Location) { }

  ngOnInit() {
    this.formInit();
    this.isOnEdit = this.doNothingService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }
    this.editModel = this.doNothingService.editModel;
    if (this.isOnEdit) {
      this.strToArray(['skipTheseLifecycle', 'skipTheseAssetSources', 'skipTheseUnitClasses' ]);
      this.commonService.updateForm(this.formGroup, this.editModel);
      this.formGroup.patchValue({
        scenariosToRun: [this.editModel['scenarioName']]
      })
    }

    this.doNothingService.getSkipTheseLifecycles().subscribe(
      (res: ConfigData[])=> this.skipTheseLifecycles = res
    );

    this.doNothingService.getSkipTheseAssetSources().subscribe(
      (res: ConfigData[]) => this.skipTheseAssetSources = res
    );

    this.doNothingService.getSkipTheseUnitClasses().subscribe(
      (res: ConfigData[]) => this.skipTheseUnitClasses = res
    );

    this.configScenariosService.getConfigScenarios().subscribe(
      (res: ConfigData[]) => this.scenariosToRun = res
    );
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      modelName: new FormControl('WTP', Validators.required),
      baseYear: new FormControl(2021, Validators.required),
      yearsToRun: new FormControl(20, Validators.required),
      skipTheseLifecycle: new FormControl(''),
      skipTheseAssetSources: new FormControl(''),
      skipTheseUnitClasses: new FormControl(''),
      scenariosToRun: new FormControl('', Validators.required),
      conditionRange: new FormControl(''),
      dataModelOutputTemplate: new FormControl(''),
      nrModelColumns: new FormControl(0),
      // unitsAndComponentsSeparated: new FormControl(true),
      // firstPastPostOption: new FormControl(true),
      debugMode: new FormControl(true),
      allowOverwriteToExceedBudget: new FormControl(true),
      allowSurplusBudgetRollover: new FormControl(true)
    });
  }

  addConfig(): void {
    if(this.formGroup.valid) {
      this.changeValueToId();
      this.isLoading = true;
      this.arrToString(['skipTheseLifecycle', 'skipTheseAssetSources', 'skipTheseUnitClasses', 'scenariosToRun', 'conditionRange']);
      
      this.doNothingService.addDoNothing(this.formGroup.value).subscribe(
        () => {
          this.isLoading = false;
          this.severity = Severity.SUCCESS;
          this.msg = 'Model Configuration Form ' + Message.SUCCESS_MSG;
          this.commonService.deleteMsg(this);
          this.formGroup.reset();
          this.formInit();
        },
        err => {
          this.isLoading = false;
          console.log(err);
          this.severity = Severity.ERROR;
          this.msg = Message.ERROR_MSG;
          this.commonService.deleteMsg(this);
        }
      );
    }
  }

  editConfig(): void {
    if(this.formGroup.valid) {
      this.changeValueToId();
      this.isLoading = true;
      this.arrToString(['skipTheseLifecycle', 'skipTheseAssetSources', 'skipTheseUnitClasses', 'scenariosToRun', 'conditionRange']);

      this.doNothingService.onEditModelConfig(this.formGroup.value).subscribe(
        () => {
          this.isLoading = false;
          this.severity = Severity.SUCCESS;
          this.msg = 'Model Configurarion Form ' + Message.EDIT_SUCCESS_MSG;
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
  }

  goBack(): void {
    this.location.back();
    this.isOnEdit = false;
  }

  private arrToString(data: string[]) {
    data.forEach(i => this.formGroup.value[i] = this.formGroup.value[i].toString());
  }

  private strToArray(data: string[]) {
    data.forEach(i => this.editModel[i] = this.editModel[i].split(",") );
  }

  private changeValueToId() {
    this.formGroup.value.scenariosToRun.forEach((scenario, i) => {
      this.scenariosToRun.forEach(item => {
        if(scenario === item.value) {
          this.formGroup.value.scenariosToRun[i] = item.id;
        }
      })
    })
  }
}