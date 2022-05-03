import { Component, OnDestroy, OnInit } from '@angular/core';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { CohortModel } from 'src/app/do-nothing/models/cohortData.interface';
import {ConfirmationService} from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { CohortComponent } from '../../addEdit/cohort/cohort.component';
import { Subscription } from 'rxjs';
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-cohort-table',
  templateUrl: './cohort-table.component.html',
  styleUrls: ['./cohort-table.component.scss']
})
export class CohortTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allCohorts: CohortModel[] = [];
  unCheckAll: boolean;
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

  constructor( private cohortService: CohortService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllCohorts();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllCohorts();
      } else {
        this.allCohorts[this.index] = res.value;
      }
    })
  }

  onEditRow(data: CohortModel, idx: number): void {
    this.index = idx;
    this.cohortService.onEditRow(data);
    this.commonService.show(CohortComponent);
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.cohortService.deleteCohort(id).subscribe(
          () => {
            this.isLoading = false;
            this.allCohorts = this.allCohorts.filter( (val) => val['cohortId'] !== id);
            this.msgDetails = {msg: Message.DELETE_SUCCESS_MSG, severity: Severity.SUCCESS};
          },
          () => {
            this.isLoading = false;
            this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
          }
        );
      }
    });
  }

  copyCohorts(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.cohortService.copyCohorts(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.checkedData = [];
          this.msgDetails = {msg: 'Copy Cohorts ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: CohortModel, ev, idx: number): void{
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.cohortId, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.cohortId)
    }
  }

  private getAllCohorts(): void {
    this.isLoading = true;
    this.cohortService.getAllCohorts().subscribe(
      (res: CohortModel[]) => {
        this.allCohorts = res;
        this.isLoading = false;
      },
      err => {
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
