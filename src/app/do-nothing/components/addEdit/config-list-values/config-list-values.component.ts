import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ListValuesModel } from 'src/app/do-nothing/models/listValuesData.interface';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigListValuesService } from 'src/app/do-nothing/services/config-listValues.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-config-list-values',
  templateUrl: './config-list-values.component.html',
  styleUrls: ['./config-list-values.component.scss']
})
export class ConfigListValuesComponent implements OnInit {
  formGroup: FormGroup;
  msgDetails: MsgDetails;
  isOnEdit: boolean;
  isLoading: boolean;
  private editListValues: ListValuesModel[];
  
  constructor( 
               private listValuesService: ConfigListValuesService,
               private commonService: CommonService,
               private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.formInit();
    this.isOnEdit = !this.dialogConfig.data?.add;
    
    if (this.isOnEdit) {
      this.editListValues = this.listValuesService.editListValues;
      this.commonService.updateForm(this.formGroup, this.editListValues);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      listId: new FormControl(0),
      listLookup: new FormControl(""),
      listValue: new FormControl("")
    })
  }

  addConfig(): void {
    this.isLoading = true;
    this.listValuesService.addConfigListValue(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config List Value Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.formInit();
        this.commonService.updateData();
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.listValuesService.onEditListValues(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'List Value Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData();
        this.editListValues = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editListValues);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }
}
