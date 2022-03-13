import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigListValuesService } from 'src/app/do-something/services/config-listValues.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-config-list-values',
  templateUrl: './config-list-values.component.html',
  styleUrls: ['./config-list-values.component.scss']
})
export class ConfigListValuesComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({
    listId: new FormControl(0),
    listLookup: new FormControl(""),
    listValue: new FormControl("")
  });
  public severity: string;
  public msg: string;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor( 
               private listValuesService: ConfigListValuesService,
               private commonService: CommonService,
               private location: Location) { }

  ngOnInit(): void {
    this.isOnEdit = this.listValuesService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }
    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.listValuesService.editListValues);
    }
  }

  addConfig(): void {
    this.isLoading = true;
    this.listValuesService.addConfigListValue(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Config List Value Form ' +  Message.SUCCESS_MSG;
        this.commonService.deleteMsg(this);
        this.formGroup.reset();
      },
      () => {
        this.isLoading = false;
        this.severity = Severity.ERROR;
        this.msg = Message.ERROR_MSG;
        this.commonService.deleteMsg(this);
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.listValuesService.onEditListValues(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'List Value Form ' +  Message.EDIT_SUCCESS_MSG;
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
