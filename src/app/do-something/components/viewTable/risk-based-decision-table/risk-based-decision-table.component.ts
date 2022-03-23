import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { RiskBasedDecisionModel } from 'src/app/do-something/models/riskBasedDecisionData.interface';
import { ConfigRiskBasedDecisionsService } from 'src/app/do-something/services/config-RiskBasedDecisions.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-risk-based-decision-table',
  templateUrl: './risk-based-decision-table.component.html',
  styleUrls: ['./risk-based-decision-table.component.scss']
})
export class RiskBasedDecisionTableComponent implements OnInit {
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allRiskBasedDecisions: RiskBasedDecisionModel[] = [];
  public shownAllRiskBasedDecisions: RiskBasedDecisionModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private riskBasedDecisionService: ConfigRiskBasedDecisionsService,
               private router: Router,
               private commonService: CommonService) { }

   ngOnInit(): void {
     this.isLoading = true
     this.riskBasedDecisionService.getAllRiskBasedDecisions().subscribe(
      (res: RiskBasedDecisionModel[]) => {
        this.allRiskBasedDecisions = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
     );
   }

  onEditRow(data: RiskBasedDecisionModel): void {
    this.riskBasedDecisionService.onEditRow(data);
    this.router.navigate([AppConfig.routes.edit.configRiskBasedDecision]);
  }

  onDeleteRow(id: number): void {
    if(confirm('Are you sure in delating this config?')) {
      this.isLoading = true;
      this.riskBasedDecisionService.deleteRiskBasedDecision(id).subscribe(
        () => {
          this.isLoading = false;
          this.allRiskBasedDecisions = this.allRiskBasedDecisions.filter( (val) => val['decisionId'] !== id);
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
    if(ev.page * ev.rows >= this.allRiskBasedDecisions.length) {
      ev.first -= 10;
    }

    this.shownAllRiskBasedDecisions = this.allRiskBasedDecisions.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllRiskBasedDecisions = this.allRiskBasedDecisions.filter(item => {
        for(let key in item) {
          if(item[key] && key !== 'decisionId' && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllRiskBasedDecisions = this.allRiskBasedDecisions;
      this.onPageChange(this.currentPage);
    }
  }
}
