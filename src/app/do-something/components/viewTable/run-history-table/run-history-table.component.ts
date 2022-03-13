import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { RunHistoryModel } from 'src/app/do-something/models/runHistoryData.interface';
import { RunHistoryService } from 'src/app/do-something/services/runHistroy.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-run-history-table',
  templateUrl: './run-history-table.component.html',
  styleUrls: ['./run-history-table.component.scss']
})
export class RunHistoryTableComponent implements OnInit {
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allRunHistory: RunHistoryModel[] = [];
  public shownAllRunHistory: RunHistoryModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private runHistoryService: RunHistoryService ) { }

   ngOnInit(): void {
     this.isLoading = true
     this.runHistoryService.getAllRiskBasedDecisions().subscribe(
      (res: RunHistoryModel[]) => {
        this.allRunHistory = res;
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
    if(ev.page * ev.rows >= this.allRunHistory.length) {
      ev.first -= 10;
    }

    this.shownAllRunHistory = this.allRunHistory.slice(ev.first, ev.first + ev.rows);
  }

  // filterData(search: string): void {
  //   if (search.length) {
  //     this.shownAllRiskBasedDecisions = this.allRiskBasedDecisions.filter(item => {
  //       for(let key in item) {
  //         if(key !== 'decisionId' && item[key] !== null && item[key].toString().includes(search)) {
  //           return item;
  //         }
  //       }
  //     })
  //   } else {
  //     this.shownAllRiskBasedDecisions = this.allRiskBasedDecisions;
  //     this.onPageChange({first: 0, rows: 10});
  //   }
  // }
}
