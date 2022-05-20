import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { ConfigFieldsService } from 'src/app/do-nothing/services/config-fields.service';
import { CommonService } from 'src/app/services/common.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FieldModel } from 'src/app/do-nothing/models/fieldData.interface';

@Component({
  selector: 'app-config-fields',
  templateUrl: './config-fields.component.html',
  styleUrls: ['./config-fields.component.scss']
})
export class ConfigFieldsComponent implements OnInit {
  formGroup: FormGroup;
  msgDetails: MsgDetails;
  isOnEdit: boolean;
  isLoading: boolean;
  private editFields: FieldModel[];

  constructor( private fieldsService: ConfigFieldsService,
               private commonService: CommonService,
               private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.formInit();
    this.isOnEdit = !this.dialogConfig.data?.add;

    if (this.isOnEdit) {
      this.editFields = this.fieldsService.editFields;
      this.commonService.updateForm(this.formGroup, this.editFields);
    }
}

formInit(): void {
  this.formGroup = new FormGroup({
    tab: new FormControl(''),
    internalFieldReference: new FormControl(''),
    fieldNameInSheet: new FormControl(''),
    column: new FormControl(''),
    mandatoryForModel: new FormControl(true)
  })
}

  addConfig(): void {
    this.isLoading = true;
    this.fieldsService.addConfigFields(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Fields Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.formInit();
        this.commonService.updateData();
      },
      err => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.fieldsService.onEditField(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Fields Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData();
        this.editFields = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editFields);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }
}
