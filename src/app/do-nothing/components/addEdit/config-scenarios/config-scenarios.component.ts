import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ScenarioModel } from 'src/app/do-nothing/models/scenarioData.interface';

@Component({
  selector: 'app-config-scenarios',
  templateUrl: './config-scenarios.component.html',
  styleUrls: ['./config-scenarios.component.scss']
})
export class ConfigScenariosComponent implements OnInit {
  public formGroup: FormGroup;
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  private editScenario: ScenarioModel[];

  constructor( private sccenariosService: ConfigScenariosService,
               private commonService: CommonService,
               private dialogConfig: DynamicDialogConfig) { }

  ngOnInit() {
    this.formInit();
    this.isOnEdit = !this.dialogConfig.data?.add;
    
    if (this.isOnEdit) {
      this.editScenario = this.sccenariosService.editScenario;
      this.updateForm(this.formGroup, this.editScenario);
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
    this.sccenariosService.addConfigScenarios(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Scenarios Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
        this.formInit();
        this.commonService.updateData(true);
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
    this.sccenariosService.onEditScenario(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Scenario Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
        console.log(this.formGroup);
        
        this.commonService.updateData(this.formGroup);
        this.editScenario = this.formGroup.value;
        this.updateForm(this.formGroup, this.editScenario);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.commonService.deleteMsg(this);
      }
    );
  }

  private updateForm(formGroup, newData)  {
    return Object.keys(formGroup.controls).forEach( (controlName) => {
          formGroup.controls[controlName].patchValue(newData[controlName]);
    })
  }
}
