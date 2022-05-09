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
  isLoading: boolean;
  msgDetails: MsgDetails;
  allRiskBasedDecisions: RiskBasedDecisionModel[];
  isPageChecked: boolean;
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
      }
    })
   }

  onEditRow(data: RiskBasedDecisionModel, idx: number): void {
    this.index = idx;
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
    let configIds = [];
    this.allRiskBasedDecisions.map(el => el.check && configIds.push(el.decisionId));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      this.riskBasedDecisionService.copyRiskBasedDecisions(configIds).subscribe(
        res => {
          this.getAllRiskBasedDecisions();
          this.msgDetails = {msg: 'Copy Risk Based Decisions ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  deleteRiskBasedDecisions(): void {
    let configIds = [];
    this.allRiskBasedDecisions.map(el => el.check && configIds.push(el.decisionId));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_DELETE, severity: Severity.WARNING};
    } else {
      this.isLoading = true;

      this.riskBasedDecisionService.deleteRiskBasedDecisions(configIds).subscribe(
        res => {
          this.getAllRiskBasedDecisions();
          this.msgDetails = {msg:  Message.DELETE_SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(ev, idx: number): void{
    if(ev.target.checked) {
      this.allRiskBasedDecisions[idx].check = true;
    } else {
      this.allRiskBasedDecisions[idx].check = false;
    }
  }

  onCheckPage(ev, dt): void {
    for(let i = dt._first; i < dt._first + dt._rows; i++ ) {
      if(i >= this.allRiskBasedDecisions.length) {
        break;
      }
      this.onChecked(ev, i);
    }
  }

  paginate(ev): void {
    this.isPageChecked = this.allRiskBasedDecisions[ev.first].check ? true : false;
  }

  private getAllRiskBasedDecisions(): void {
    this.riskBasedDecisionService.getAllRiskBasedDecisions().subscribe(
      (res: RiskBasedDecisionModel[]) => {
        this.allRiskBasedDecisions = res;
        this.isLoading = false;
        this.isPageChecked = false;
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
