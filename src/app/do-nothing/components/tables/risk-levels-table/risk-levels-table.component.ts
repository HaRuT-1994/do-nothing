import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { RiskLevelsModel } from 'src/app/do-nothing/models/riskLevelData.interface';
import { CommonService } from 'src/app/services/common.service';
import { RiskLevelsService } from 'src/app/do-nothing/services/risk-levels.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { RiskLevelsComponent } from '../../addEdit/risk-levels/risk-levels.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-risk-levels-table',
  templateUrl: './risk-levels-table.component.html',
  styleUrls: ['./risk-levels-table.component.scss']
})
export class RiskLevelsTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allRiskLevels: RiskLevelsModel[] = [];
  isPageChecked: boolean;
  private sub$: Subscription;

  constructor(private riskLvlService: RiskLevelsService,
              private commonService: CommonService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllRiskLevels();

    this.sub$ = this.commonService.getData().subscribe(() => this.getAllRiskLevels() );
  }

  onEditRow(data: RiskLevelsModel): void {
    this.riskLvlService.onEditRow(data);
    this.commonService.show(RiskLevelsComponent);
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.riskLvlService.deleteRiskLevel(id).subscribe(
          () => {
            this.isLoading = false;
            this.allRiskLevels = this.allRiskLevels.filter( (val) => val['id'] !== id);
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

  copyRiskLvls(): void {
    let configIds = [];
    this.allRiskLevels.map(el => el.check && configIds.push(el.id));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;

      this.riskLvlService.copyRiskLvls(configIds).subscribe(
        res => {
          this.getAllRiskLevels();
          this.msgDetails = {msg: 'Copy Risk Levels ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  deleteRiskLvls(): void {
    let configIds = [];
    this.allRiskLevels.map(el => el.check && configIds.push(el.id));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_DELETE, severity: Severity.WARNING};
    } else {
      this.isLoading = true;

      this.riskLvlService.deleteRiskLvls(configIds).subscribe(
        res => {
          this.getAllRiskLevels();
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
      this.allRiskLevels[idx].check = true;
    } else {
      this.allRiskLevels[idx].check = false;
    }
  }

  onCheckPage(ev, dt): void {
    for(let i = dt._first; i < dt._first + dt._rows; i++ ) {
      if(i >= this.allRiskLevels.length) {
        break;
      }
      this.onChecked(ev, i);
    }
  }

  paginate(ev): void {
    this.isPageChecked = this.allRiskLevels[ev.first].check ? true : false;
  }

private getAllRiskLevels(): void {
  this.isLoading = true
  this.riskLvlService.getAllRiskLevels().subscribe(
    (res: RiskLevelsModel[]) => {
      this.allRiskLevels = res;
      this.isLoading = false;
      this.isPageChecked = false;
    },
    err => {
      this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      this.isLoading = false;
    }
  );
}

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
