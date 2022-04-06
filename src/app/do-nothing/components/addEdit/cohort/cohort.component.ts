import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';

@Component({
  selector: 'app-cohort',
  templateUrl: './cohort.component.html',
  styleUrls: ['./cohort.component.scss']
})
export class CohortComponent implements OnInit {
  public formGroup: FormGroup;
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor( private cohortService: CohortService,
               private commonService: CommonService,
               private location: Location) { }

  ngOnInit(): void {
    this.formInit();
    this.isOnEdit = this.cohortService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }
    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.cohortService.editCohort);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      cohorts: new FormControl(''),
      description: new FormControl('')
    })
  }

  addConfig(): void {
    this.isLoading = true;
    this.cohortService.addCohort(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Cohort Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
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
    this.cohortService.onEditCohort(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Cohort Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
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
