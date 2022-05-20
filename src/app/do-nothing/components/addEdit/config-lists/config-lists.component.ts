import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ListsModel } from 'src/app/do-nothing/models/listsData.interface';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigListsService } from 'src/app/do-nothing/services/config-lists.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-config-lists',
  templateUrl: './config-lists.component.html',
  styleUrls: ['./config-lists.component.scss']
})
export class ConfigListsComponent implements OnInit {
  formGroup: FormGroup;
  msgDetails: MsgDetails;
  isOnEdit: boolean;
  isLoading: boolean;
  private editLists: ListsModel[];
  
  constructor( 
              private listService: ConfigListsService,
              private commonService: CommonService,
              private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.formInit();
    this.isOnEdit = !this.dialogConfig.data?.add;
    
    if (this.isOnEdit) {
      this.editLists = this.listService.editLists;
      this.commonService.updateForm(this.formGroup, this.editLists);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      listName: new FormControl("")
    })
  }

  addConfig(): void {
    this.isLoading = true;
    this.listService.addConfigList(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Config List Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
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
    this.listService.onEditCohort(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'List Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData();
        this.editLists = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editLists);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }
}
