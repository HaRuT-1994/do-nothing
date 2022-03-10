import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { CohortService } from 'src/app/shared/services/cohort.service';
import { Severity } from 'src/app/shared/enums/severity.enum';
import { Message } from 'src/app/shared/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-cohort',
  templateUrl: './cohort.component.html',
  styleUrls: ['./cohort.component.scss']
})
export class CohortComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({
    cohorts: new FormControl(''),
    description: new FormControl('')
  });
  public severity: string;
  public msg: string;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor( private cohortService: CohortService,
               private commonService: CommonService,
               private location: Location) { }

  ngOnInit(): void {
    this.isOnEdit = this.cohortService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }
    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.cohortService.editCohort);
    }
  }

  addConfig(): void {
    this.isLoading = true;
    this.cohortService.addCohort(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Cohort Form ' +  Message.SUCCESS_MSG;
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
    this.cohortService.onEditCohort(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Cohort Form ' +  Message.EDIT_SUCCESS_MSG;
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
