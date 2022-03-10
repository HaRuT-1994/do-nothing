import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Severity } from 'src/app/shared/enums/severity.enum';
import { Message } from 'src/app/shared/enums/message.enum';
import { ConfigFieldsService } from 'src/app/shared/services/config-fields.service';
import { CommonService } from 'src/app/services/common.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-config-fields',
  templateUrl: './config-fields.component.html',
  styleUrls: ['./config-fields.component.scss']
})
export class ConfigFieldsComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({
    tab: new FormControl(''),
    internalFieldReference: new FormControl(''),
    fieldNameInSheet: new FormControl(''),
    column: new FormControl(''),
    mandatoryForModel: new FormControl(true)
  });
  public severity: string;
  public msg: string;
  public isOnEdit: boolean;
  public isLoading: boolean;

  constructor( private fieldsService: ConfigFieldsService,
               private commonService: CommonService,
               private location: Location) { }

  ngOnInit(): void {
  this.isOnEdit = this.fieldsService.isOnEdit;
  if(this.location.path().includes('add')) {
    this.isOnEdit = false;
  }
  if (this.isOnEdit) {
    this.commonService.updateForm(this.formGroup, this.fieldsService.editFields);
  }
}

  addConfig(): void {
    this.isLoading = true;
    this.fieldsService.addConfigFields(this.formGroup.value).subscribe(
      () => {
        this.severity = Severity.SUCCESS;
        this.isLoading = false;
        this.msg = 'Fields Form ' + Message.SUCCESS_MSG;
        this.commonService.deleteMsg(this);
        this.formGroup.reset();
      },
      err => { 
        console.log(err);
        this.isLoading = false;
        this.severity = Severity.ERROR;
        this.msg = Message.ERROR_MSG;
        this.commonService.deleteMsg(this);
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.fieldsService.onEditField(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Fields Form ' +  Message.EDIT_SUCCESS_MSG;
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
