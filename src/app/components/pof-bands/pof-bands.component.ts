import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PofBandsService } from 'src/app/services/pof-bands.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { ConfigScenariosService } from 'src/app/services/config-scenarios.service';
import { CohortService } from 'src/app/services/cohort.service';

@Component({
  selector: 'app-pof-bands',
  templateUrl: './pof-bands.component.html',
  styleUrls: ['./pof-bands.component.scss']
})
export class PofBandsComponent {
  public formGroup: FormGroup = new FormGroup({
    scenarioId: new FormControl(0),
    cohortId: new FormControl(0),
    _1: new FormControl(0),
    _2: new FormControl(0),
    _3: new FormControl(0),
    _4: new FormControl(0),
    _5: new FormControl(0)
  });

  public severity = '';
  public msg = '';
  cohortData: ConfigData[] = [];
  scenarioData: ConfigData[] = [];

  constructor(private pofBandsService: PofBandsService, private commonService: CommonService,
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
    this.pofBandsService.addPofBands(this.formGroup.value).subscribe(
      () => {
        this.severity = Severity.SUCCESS;
        this.msg = 'PoF Bands Form '+ Message.SUCCESS_MSG;
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