import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { CohortService } from 'src/app/do-nothing/services/cohort.service';
import { Severity } from 'src/app/do-nothing/enums/severity.enum';
import { Message } from 'src/app/do-nothing/enums/message.enum';
import { CommonService } from 'src/app/do-nothing/services/common.service';
import { CohortModel } from 'src/app/do-nothing/models/cohortData.interface';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-cohort-table',
  templateUrl: './cohort-table.component.html',
  styleUrls: ['./cohort-table.component.scss']
})
export class CohortTableComponent implements OnInit {
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allCohorts: CohortModel[] = [];
  public pageN: CohortModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private cohortService: CohortService,
               private router: Router,
               private commonService: CommonService) { }

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
    this.cohortService.onEditRow(data);
    this.router.navigate([AppConfig.routes.edit.configCohort]);
  }

  onDeleteRow(id: number): void {
    if(confirm('Are you sure in delating this config?')) {
      this.isLoading = true;
      this.cohortService.deleteCohort(id).subscribe(
        () => {
          this.isLoading = false;
          this.allCohorts = this.allCohorts.filter( (val) => val['cohortId'] !== id);
          this.onPageChange(this.currentPage);
          this.severity = Severity.SUCCESS;
          this.msg = Message.DELETE_SUCCESS_MSG;
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
  }

  onPageChange(ev): void {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allCohorts.length) {
      ev.first -= 10;
    }

    this.pageN = this.allCohorts.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.pageN = this.allCohorts.filter(item => {
        for(let key in item) {
          if(key !== 'cohortId' && item[key] !== null && item[key].toString().includes(search)) {
            return item;
          }
        }
      })
    } else {
      this.pageN = this.allCohorts;
      this.onPageChange({first: 0, rows: 10});
    }
  }
}
