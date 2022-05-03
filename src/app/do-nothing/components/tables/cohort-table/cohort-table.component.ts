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
  totalRecords: number;

  isLoading: boolean;
  msgDetails: MsgDetails;
  allCohorts: CohortModel[] = [];
  shownAllCohorts: CohortModel[] = [];
  unCheckAll: boolean;
  // private currentPage = {first: 0, rows: 10};
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
        // this.onPageChange(this.currentPage);
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
            // this.onPageChange(this.currentPage);
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
    // console.log(index, item, ev );
    
    //const idx = this.currentPage['page'] * this.currentPage['rows'] + index || index;
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
      this.totalRecords = res.length;
      // this.onPageChange(this.currentPage);
      this.isLoading = false;
    },
    err => {
      this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      this.isLoading = false;
    }
  );
}

  // onPageChange(ev): void {
  //   this.currentPage = ev;
  //   if(ev.page * ev.rows >= this.allCohorts.length) {
  //     ev.first -= 10;
  //   }

  //   this.shownAllCohorts = this.allCohorts.slice(ev.first, ev.first + ev.rows);
  // }

  // filterData(search: string): void {
  //   if (search.length) {
  //     this.shownAllCohorts = this.commonService.filterAlgorithm(this.allCohorts, search);
  //   } else {
  //     this.shownAllCohorts = this.allCohorts;
  //     this.onPageChange(this.currentPage);
  //   }
  // }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
