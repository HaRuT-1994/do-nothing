import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import { RiskBasedDecisionModel } from 'src/app/do-nothing/models/riskBasedDecisionData.interface';
import { ConfigRiskBasedDecisionsService } from 'src/app/do-nothing/services/config-RiskBasedDecisions.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigRiskBasedDecisionsComponent } from '../../addEdit/config-risk-based-decisions/config-risk-based-decisions.component';
import { Subscription } from 'rxjs';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';

@Component({
  selector: 'app-risk-based-decision-table',
  templateUrl: './risk-based-decision-table.component.html',
  styleUrls: ['./risk-based-decision-table.component.scss']
})
export class RiskBasedDecisionTableComponent implements OnInit {
  public createPath = AppConfig.routes.add.configRiskBasedDecision;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allRiskBasedDecisions: RiskBasedDecisionModel[];
  public shownAllRiskBasedDecisions: RiskBasedDecisionModel[];
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;

  constructor( private riskBasedDecisionService: ConfigRiskBasedDecisionsService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService,
               private lookup: LookupService) { }

   ngOnInit(): void {
     this.isLoading = true
     this.getAllRiskBasedDecisions();

     this.sub$ = this.commonService.getData().subscribe(res => {
      if(res[1]) {
        this.getAllRiskBasedDecisions();
      } else {
        this.allRiskBasedDecisions[this.index] = res[0]?.value;
        this.shownAllRiskBasedDecisions[this.index] = res[0]?.value;
      }
      
    })
   }

  onEditRow(data: RiskBasedDecisionModel, i: number): void {
    this.index = i;
    this.confirmationService.confirm({
      message: 'Edit config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.riskBasedDecisionService.onEditRow(data);
        this.commonService.show(ConfigRiskBasedDecisionsComponent);
      }
    });
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.riskBasedDecisionService.deleteRiskBasedDecision(id).subscribe(
          () => {
            this.isLoading = false;
            this.allRiskBasedDecisions = this.allRiskBasedDecisions.filter( (val) => val['decisionId'] !== id);
            this.onPageChange(this.currentPage);
            this.msgDetails = {msg:  Message.DELETE_SUCCESS_MSG, severity: Severity.SUCCESS};
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

  private getAllRiskBasedDecisions(): void {
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
