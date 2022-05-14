import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CohortModel } from 'src/app/do-nothing/models/cohortData.interface';

@Component({
  selector: 'app-cohort',
  templateUrl: './cohort.component.html',
  styleUrls: ['./cohort.component.scss']
})
export class CohortComponent implements OnInit {
  formGroup: FormGroup;
  msgDetails: MsgDetails;
  isLoading: boolean;
  isOnEdit: boolean;
  private editCohort: CohortModel[];
  
  constructor( private cohortService: CohortService,
               private commonService: CommonService,
               private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.formInit();
    this.isOnEdit = !this.dialogConfig.data?.add;
    
    if (this.isOnEdit) {
      this.editCohort = this.cohortService.editCohort;
      this.commonService.updateForm(this.formGroup, this.editCohort);
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
        this.formInit();
        this.commonService.updateData(true);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.cohortService.onEditCohort(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Cohort Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData(this.formGroup);
        this.editCohort = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editCohort);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }
}
