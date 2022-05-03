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
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-risk-based-decision-table',
  templateUrl: './risk-based-decision-table.component.html',
  styleUrls: ['./risk-based-decision-table.component.scss']
})
export class RiskBasedDecisionTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allRiskBasedDecisions: RiskBasedDecisionModel[];
  unCheckAll: boolean;
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

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
    if(!this.checkedData.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.riskBasedDecisionService.copyRiskBasedDecisions(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.checkedData = [];
          this.msgDetails = {msg: 'Copy Risk Based Decisions ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: RiskBasedDecisionModel, ev, idx: number): void{
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.decisionId, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.decisionId)
    }
  }

  private getAllRiskBasedDecisions(): void {
    this.riskBasedDecisionService.getAllRiskBasedDecisions().subscribe(
      (res: RiskBasedDecisionModel[]) => {
        this.allRiskBasedDecisions = res;
        this.isLoading = false;
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
