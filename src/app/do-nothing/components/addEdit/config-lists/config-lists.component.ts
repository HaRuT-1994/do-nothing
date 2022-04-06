import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  public formGroup: FormGroup;
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor( 
               private listService: ConfigListsService,
               private commonService: CommonService,
               private location: Location) { }

  ngOnInit(): void {
    this.formInit();
    this.isOnEdit = this.listService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }
    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.listService.editLists);
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
        this.commonService.deleteMsg(this);
        this.formGroup.reset();
        this.formInit();
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.commonService.deleteMsg(this);
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.listService.onEditCohort(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'List Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.commonService.deleteMsg(this);
      }
    );
  }

  goBack(): void {
    this.location.back();
    this.isOnEdit = false;
  }
}
