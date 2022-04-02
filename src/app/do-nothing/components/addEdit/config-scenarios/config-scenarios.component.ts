import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-config-scenarios',
  templateUrl: './config-scenarios.component.html',
  styleUrls: ['./config-scenarios.component.scss']
})
export class ConfigScenariosComponent implements OnInit {
  public formGroup: FormGroup;
  public severity: string;
  public msg: string;
  public isOnEdit: boolean;
  public isLoading: boolean;
  public scenarioData: ConfigData[] = [];

  constructor( private sccenariosService: ConfigScenariosService,
               private commonService: CommonService,
               private location: Location) { }

  ngOnInit() {
    this.formInit();
    this.isOnEdit = this.sccenariosService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }
    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.sccenariosService.editScenario);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      scenario: new FormControl(''),
      validatedOption: new FormControl(false),
      restrictToBudget: new FormControl(false),
      run: new FormControl(false)
    })
  }

  addConfig(): void {
    this.isLoading = true;
    console.log(this.formGroup.value);
    
    this.sccenariosService.addConfigScenarios(this.formGroup.value).subscribe(
      () => {
        this.severity = Severity.SUCCESS;
        this.isLoading = false;
        this.msg = 'Scenarios Form ' + Message.SUCCESS_MSG;
        this.commonService.deleteMsg(this);
        this.formGroup.reset();
        this.formInit();
      },
      err => { 
        console.log(err);
        this.severity = Severity.ERROR;
        this.msg = Message.ERROR_MSG;
        this.commonService.deleteMsg(this);
        this.isLoading = false;
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.sccenariosService.onEditScenario(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Scenario Form ' +  Message.EDIT_SUCCESS_MSG;
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