import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { CohortModel } from 'src/app/do-nothing/models/cohortData.interface';
import {ConfirmationService} from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { CohortComponent } from '../../addEdit/cohort/cohort.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cohort-table',
  templateUrl: './cohort-table.component.html',
  styleUrls: ['./cohort-table.component.scss']
})
export class CohortTableComponent implements OnInit, OnDestroy {
  public createPath = AppConfig.routes.add.cohort;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allCohorts: CohortModel[] = [];
  public shownAllCohorts: CohortModel[] = [];
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;

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
        this.shownAllCohorts[this.index] = res.value;
      }
    })
  }

  onEditRow(data: CohortModel, i: number): void {
    this.index = i;
    // this.confirmationService.confirm({
    //   message: 'Edit config?',
    //   header: 'Confirmation',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
        this.cohortService.onEditRow(data);
        this.commonService.show(CohortComponent);
    //   }
    // });
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
            this.onPageChange(this.currentPage);
            this.msgDetails = {msg: Message.DELETE_SUCCESS_MSG, severity: Severity.SUCCESS};
            this.commonService.deleteMsg(this);
          },
          () => {
            this.isLoading = false;
            this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
            this.commonService.deleteMsg(this);
          }
        );
      }
    });
  }

private getAllCohorts(): void {
  this.isLoading = true;
  this.cohortService.getAllCohorts().subscribe(
    (res: CohortModel[]) => {
      this.allCohorts = res;
      this.onPageChange(this.currentPage);
      this.isLoading = false;
    },
    err => {
      console.log(err);
    }
  );
}

  onPageChange(ev): void {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allCohorts.length) {
      ev.first -= 10;
    }

    this.shownAllCohorts = this.allCohorts.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllCohorts = this.allCohorts.filter(item => {
        for(let key in item) {
          if( item[key] && key !== 'cohortId'
          && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllCohorts = this.allCohorts;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
