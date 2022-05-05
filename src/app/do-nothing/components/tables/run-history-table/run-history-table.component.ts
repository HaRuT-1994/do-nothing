import { Component, OnInit } from '@angular/core';
import { RunHistoryModel } from 'src/app/do-nothing/models/runHistoryData.interface';
import { RunHistoryService } from 'src/app/do-nothing/services/runHistroy.service';


@Component({
  selector: 'app-run-history-table',
  templateUrl: './run-history-table.component.html',
  styleUrls: ['./run-history-table.component.scss']
})
export class RunHistoryTableComponent implements OnInit {
  public isLoading: boolean;
  public allRunHistory: RunHistoryModel[] = [];

  constructor( private runHistoryService: RunHistoryService ) { }

   ngOnInit(): void {
     this.isLoading = true
     this.runHistoryService.getAllRiskBasedDecisions().subscribe(
      (res: RunHistoryModel[]) => {
        this.allRunHistory = res;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
     );
   }
}
