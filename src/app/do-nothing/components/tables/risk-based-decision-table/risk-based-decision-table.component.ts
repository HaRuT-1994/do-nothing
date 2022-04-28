import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class RiskBasedDecisionTableComponent implements OnInit, OnDestroy {
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
      if(typeof res === 'boolean') {
        this.getAllRiskBasedDecisions();
      } else {
        this.allRiskBasedDecisions[this.index] = res.value;
        this.onPageChange(this.currentPage);
      }
    })
   }

  onEditRow(data: RiskBasedDecisionModel, i: number): void {
    this.index = this.currentPage['page'] * this.currentPage['rows'] + i || i;
    this.riskBasedDecisionService.onEditRow(data);
    this.commonService.show(ConfigRiskBasedDecisionsComponent);
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
          },
          () => {
            this.isLoading = false;
            this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
          }
        );
      }
    });
  }

  copyRiskBasedDecisions(): void {
    this.isLoading = true;
    this.riskBasedDecisionService.copyRiskBasedDecisions().subscribe(
       res => {
         this.isLoading = false;
         this.msgDetails = {msg: 'Copy Risk Based Decisions ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
       },
       err => {
         this.isLoading = false;
         this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
       }
    )
  }

  onChecked(item: RiskBasedDecisionModel, ev): void{
    if(ev.target.checked) {
      this.riskBasedDecisionService.checkedData.push(item.decisionId);
    } else {
      this.riskBasedDecisionService.checkedData = this.riskBasedDecisionService.checkedData.filter(el => el !== item.decisionId)
    }
  }

  private getAllRiskBasedDecisions(): void {
    this.riskBasedDecisionService.getAllRiskBasedDecisions().subscribe(
      (res: RiskBasedDecisionModel[]) => {
        this.allRiskBasedDecisions = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.isLoading = false;
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
      this.shownAllRiskBasedDecisions = this.commonService.filterAlgorithm(this.allRiskBasedDecisions, search);
    } else {
      this.shownAllRiskBasedDecisions = this.allRiskBasedDecisions;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
