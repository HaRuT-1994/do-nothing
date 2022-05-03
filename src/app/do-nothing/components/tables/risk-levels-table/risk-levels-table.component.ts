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
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-risk-levels-table',
  templateUrl: './risk-levels-table.component.html',
  styleUrls: ['./risk-levels-table.component.scss']
})
export class RiskLevelsTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allRiskLevels: RiskLevelsModel[] = [];
  shownAllRiskLevels: RiskLevelsModel[] = [];
  unCheckAll: boolean;
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

  constructor(private riskLvlService: RiskLevelsService,
              private commonService: CommonService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllRiskLevels();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllRiskLevels();
      } else {
        this.allRiskLevels[this.index] = res.value;
        this.onPageChange(this.currentPage);
      }
    })
  }

  onEditRow(data: RiskLevelsModel, i: number): void {
    this.index = this.currentPage['page'] * this.currentPage['rows'] + i || i;
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

  copyRiskLvls(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: 'Please check config', severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.riskLvlService.copyRiskLvls(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.msgDetails = {msg: 'Copy Risk Levels ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: RiskLevelsModel, ev, index: number): void{
    const idx = this.currentPage['page'] * this.currentPage['rows'] + index || index;
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.id, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.id)
    }
  }

private getAllRiskLevels(): void {
  this.isLoading = true
  this.riskLvlService.getAllRiskLevels().subscribe(
    (res: RiskLevelsModel[]) => {
      this.allRiskLevels = res;
      this.onPageChange(this.currentPage);
      this.isLoading = false;
    },
    err => {
      this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      this.isLoading = false;
    }
  );
}
  

  onPageChange(ev) {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allRiskLevels.length) {
      ev.first -= 10;
    }

    this.shownAllRiskLevels = this.allRiskLevels.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllRiskLevels = this.commonService.filterAlgorithm(this.allRiskLevels, search);
    } else {
      this.shownAllRiskLevels = this.allRiskLevels;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
