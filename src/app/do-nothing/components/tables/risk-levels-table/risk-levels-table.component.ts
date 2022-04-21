import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
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
  public createPath = AppConfig.routes.add.configRiskLevels;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allRiskLevels: RiskLevelsModel[] = [];
  public shownAllRiskLevels: RiskLevelsModel[] = [];
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;

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
        this.shownAllRiskLevels[this.index] = res.value;
      }
    })
  }

  onEditRow(data: RiskLevelsModel, i: number): void {
    this.index = i;
    // this.confirmationService.confirm({
    //   message: 'Edit config?',
    //   header: 'Confirmation',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
        this.riskLvlService.onEditRow(data);
        this.commonService.show(RiskLevelsComponent);
    //   }
    // });
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

private getAllRiskLevels(): void {
  this.isLoading = true
  this.riskLvlService.getAllRiskLevels().subscribe(
    (res: RiskLevelsModel[]) => {
      this.allRiskLevels = res;
      this.onPageChange(this.currentPage);
      this.isLoading = false;
    },
    err => {
      this.isLoading = false;
      console.log(err);
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
      this.shownAllRiskLevels = this.allRiskLevels.filter(item => {
        for(let key in item) {
          if( item[key] && key !== 'id' && item[key].toString().toLowerCase().includes(search).toLowerCase()) {
            return item;
          }
        }
      })
    } else {
      this.shownAllRiskLevels = this.allRiskLevels;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
