import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { CohortModel } from 'src/app/do-nothing/models/cohortData.interface';
import {ConfirmationService} from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';

@Component({
  selector: 'app-cohort-table',
  templateUrl: './cohort-table.component.html',
  styleUrls: ['./cohort-table.component.scss']
})
export class CohortTableComponent implements OnInit {
  public createPath = AppConfig.routes.add.cohort;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allCohorts: CohortModel[] = [];
  public shownAllCohorts: CohortModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private cohortService: CohortService,
               private router: Router,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.isLoading = true
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

  onEditRow(data: CohortModel): void {
    this.confirmationService.confirm({
      message: 'Are you sure in editing this config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cohortService.onEditRow(data);
        this.router.navigate([AppConfig.routes.edit.configCohort]);
      }
    });
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure in deleting this config?',
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
}
