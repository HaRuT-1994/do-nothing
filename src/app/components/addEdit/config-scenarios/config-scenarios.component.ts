import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigScenariosService } from 'src/app/services/config-scenarios.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';

@Component({
  selector: 'app-config-scenarios',
  templateUrl: './config-scenarios.component.html',
  styleUrls: ['./config-scenarios.component.scss']
})
export class ConfigScenariosComponent {
  public formGroup: FormGroup = new FormGroup({
    scenario: new FormControl(''),
    validatedOption: new FormControl(true),
    restrictToBudget: new FormControl(true),
    run: new FormControl(true)
  });

  public severity = '';
  public msg = '';
  public scenarioData: ConfigData[] = [];

  constructor(private configScenariosService: ConfigScenariosService, private commonService: CommonService) { }

  onSubmit() {    
    this.configScenariosService.addConfigScenarios(this.formGroup.value).subscribe(
      () => {
        this.severity = Severity.SUCCESS;
        this.msg = 'Scenarios Form ' + Message.SUCCESS_MSG;
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