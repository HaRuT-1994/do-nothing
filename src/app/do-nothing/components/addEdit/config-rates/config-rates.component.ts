import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ConfigData } from 'src/app/models/configData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigRatesService } from 'src/app/do-nothing/services/config-rates.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { RatesModel } from 'src/app/do-nothing/models/ratesData.interface';
import { ConfigListValuesService } from 'src/app/do-nothing/services/config-listValues.service';
import { ListId } from 'src/app/do-nothing/enums/listId.enum';

@Component({
  selector: 'app-config-rates',
  templateUrl: './config-rates.component.html',
  styleUrls: ['./config-rates.component.scss']
})
export class ConfigRatesComponent implements OnInit {
  formGroup: FormGroup;
  scenarioData: ConfigData[];
  cohortData: ConfigData[];
  msgDetails: MsgDetails;
  isOnEdit: boolean;
  isLoading: boolean;
  listValues: string[];
  rangeTypes: string[];
  rateTypes: string[];
  geographies: string[];
  private editRates: RatesModel[];
  
  constructor( 
               private ratesService: ConfigRatesService,
               private commonService: CommonService,
               private lookupService: LookupService,
               private dialogConfig: DynamicDialogConfig,
               private listValuesService: ConfigListValuesService) { }

  ngOnInit(): void {
    this.formInit();
    this.scenarioData = this.lookupService.configScenariosData;
    this.cohortData = this.lookupService.configCohortData;
    this.listValuesService.getListValuesByListId(ListId.FOUR).subscribe(res => this.listValues = res);
    this.listValuesService.getListValuesByListId(ListId.SIX).subscribe(res => this.rateTypes = res);
    this.listValuesService.getListValuesByListId(ListId.FIVE).subscribe(res => this.rangeTypes = res);
    this.listValuesService.getListValuesByListId(ListId.THREE).subscribe(res => this.geographies = res);
    this.isOnEdit = !this.dialogConfig.data?.add;
    
    if (this.isOnEdit) {
      this.editRates = this.ratesService.editRates;
      this.commonService.updateForm(this.formGroup, this.editRates);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      scenario: new FormControl(0),
      cohort: new FormControl(0),
      intervention: new FormControl(''),
      geography: new FormControl(''),
      budgetSource: new FormControl(''),
      value: new FormControl(0),
      rateType: new FormControl(''),
      minimumCost: new FormControl(0),
      rangeType: new FormControl(''),
      from1: new FormControl(0),
      value1: new FormControl(0),
      from2: new FormControl(0),
      value2: new FormControl(0)
    })
  }

  addConfig(): void {
    this.isLoading = true;
    this.commonService.changeToObj(this.formGroup, this.scenarioData, this.cohortData);
    this.ratesService.addConfigRates(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config Rates Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData()
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
    this.ratesService.onEditRate(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Rate Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData();
        this.editRates = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editRates);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }
}
