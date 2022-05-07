import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ConfigData } from 'src/app/models/configData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigInterventionOptionsService } from 'src/app/do-nothing/services/config-InterventionOptions.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { InterventionOptionsModel } from 'src/app/do-nothing/models/interventionOptionsData.interface';
import { ConfigListValuesService } from 'src/app/do-nothing/services/config-listValues.service';
import { ListId } from 'src/app/do-nothing/enums/listId.enum';

@Component({
  selector: 'app-config-intervention-options',
  templateUrl: './config-intervention-options.component.html',
  styleUrls: ['./config-intervention-options.component.scss']
})
export class ConfigInterventionOptionsComponent implements OnInit {
  public formGroup: FormGroup;
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  public scenarioData: ConfigData[];
  public cohortData: ConfigData[];
  public listValues: string[];
  private editInterventionOptions: InterventionOptionsModel[];
  
  constructor( 
               private interventionOptionsService: ConfigInterventionOptionsService,
               private commonService: CommonService,
               private lookupService: LookupService,
               private dialogConfig: DynamicDialogConfig,
               private fb: FormBuilder,
               private listValuesService: ConfigListValuesService) { }

  ngOnInit(): void {
    this.formInit();
    this.scenarioData = this.lookupService.configScenariosData;
    this.cohortData = this.lookupService.configCohortData;
    this.listValuesService.getListValuesByListId(ListId.FOUR).subscribe(res => this.listValues = res)
    this.isOnEdit = !this.dialogConfig.data?.add;

    if (this.isOnEdit) {
      this.editInterventionOptions = this.interventionOptionsService.editInterventionOptions;
      this.commonService.updateForm(this.formGroup, this.editInterventionOptions);
    }
  }

  formInit(): void {
    this.formGroup = this.fb.group({
      scenario: [''],
      cohort: [''],
      intervention: [''],
      available: [true],
      reset: [''],
      applyWhenMlc: [0],
      excludeIfCrc: [''],
      forceReplace: [true],
      whenAlc: [0],
      replaceWithCohortId: [null]
    })
  }

  addConfig(): void {
    this.isLoading = true;
    this.commonService.changeToObj(this.formGroup, this.scenarioData, this.cohortData);
    this.interventionOptionsService.addConfigInterventionOptions(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Intervention Options Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData(true)
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
    this.interventionOptionsService.onEditInterventionOption(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Intervention Options Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData(this.formGroup);
        this.editInterventionOptions = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editInterventionOptions);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }
}
