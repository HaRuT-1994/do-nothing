import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoNothingService } from 'src/app/services/do-nothing.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { ConfigScenariosService } from 'src/app/services/config-scenarios.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-do-nothing',
  templateUrl: './do-nothing.component.html',
  styleUrls: ['./do-nothing.component.scss']
})
export class DoNothingComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({
    modelName: new FormControl('WTP', Validators.required),
    baseYear: new FormControl(2022, Validators.required),
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
    allowOverwriteToExceedBudget: new FormControl(true)
  });
  public severity = '';
  public msg = '';
  public skipTheseLifecycles = [];
  public skipTheseAssetSources = [];
  public skipTheseUnitClasses = [];
  public scenarioData: ConfigData[] = [];
  public conditionRanges = ['1 to 5', '1 to 10'];

  constructor(private doNothingService: DoNothingService, private commonService: CommonService, private configScenariosService: ConfigScenariosService) { }

  ngOnInit() {
    this.doNothingService.getSkipTheseLifecycles().subscribe(
      res => this.skipTheseLifecycles = res
    );

    this.doNothingService.getSkipTheseAssetSources().subscribe(
      res => this.skipTheseAssetSources = res
    );

    this.doNothingService.getSkipTheseUnitClasses().subscribe(
      res => this.skipTheseUnitClasses = res
    );

    this.configScenariosService.getConfigScenarios().subscribe(
      (res: ConfigData[]) => {
        this.scenarioData = res;
      }
    )
  }

  onSubmit() {
    this.formGroup.value.skipTheseLifecycle = this.formGroup.value.skipTheseLifecycle.toString();
    this.formGroup.value.skipTheseAssetSources = this.formGroup.value.skipTheseAssetSources.toString();
    this.formGroup.value.skipTheseUnitClasses = this.formGroup.value.skipTheseUnitClasses.toString();
    this.formGroup.value.scenariosToRun = this.formGroup.value.scenariosToRun.toString();
    
    this.doNothingService.addDoNothing(this.formGroup.value).subscribe(
      () => {
        this.severity = 'Model Configuration Form ' + Severity.SUCCESS;
        this.msg = Message.SUCCESS_MSG;
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