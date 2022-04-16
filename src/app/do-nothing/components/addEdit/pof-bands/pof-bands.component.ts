import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PofBandsService } from 'src/app/do-nothing/services/pof-bands.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-pof-bands',
  templateUrl: './pof-bands.component.html',
  styleUrls: ['./pof-bands.component.scss']
})
export class PofBandsComponent {
  public formGroup: FormGroup;
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  public cohortData: ConfigData[] = [];
  public scenarioData: ConfigData[] = [];

  constructor(private pofBandsService: PofBandsService,
              private commonService: CommonService,
              private cohortService: CohortService,
              private configScenariosService: ConfigScenariosService,
              private dialogConfig: DynamicDialogConfig) { }

  ngOnInit() {
    this.formInit();
    this.cohortService.getConfigCohort().subscribe(
      (res: ConfigData[]) => {
        this.cohortData = res;
      }
    )
    this.configScenariosService.getConfigScenarios().subscribe(
      (res: ConfigData[]) => this.scenarioData = res
    );
    this.isOnEdit = !this.dialogConfig.data?.add;

    if (this.isOnEdit) {
      
      this.commonService.updateForm(this.formGroup, this.pofBandsService.editPofBand);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      scenario: new FormControl(0),
      cohort: new FormControl(0),
      _1: new FormControl(0),
      _2: new FormControl(0),
      _3: new FormControl(0),
      _4: new FormControl(0),
      _5: new FormControl(0)
    });
  }

  addConfig(): void {
    this.isLoading = true;
    this.changeToObj();
    this.pofBandsService.addPofBands(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'PoF Bands Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
        this.formGroup.reset();
        this.formInit();
      },
      err => { 
        console.log(err);
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.commonService.deleteMsg(this);
        this.isLoading = false;
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.pofBandsService.onEditPoFBand(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'PoF Bands Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.commonService.deleteMsg(this);
      }
    );
  }

  // private arrToString(data: string[]) {
  //   data.forEach(i => this.formGroup.value[i] = this.formGroup.value[i].toString());
  // }

  private changeToObj() {
    let scenario = this.scenarioData.filter(item => item.id === this.formGroup.get('scenario').value);
    let cohort = this.cohortData.filter(item => item.id === this.formGroup.get('cohort').value);

    this.formGroup.patchValue({
      scenario: scenario[0],
      cohort: cohort[0]
    })
  }
}