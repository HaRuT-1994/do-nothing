import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { RiskLevelsModel } from 'src/app/do-nothing/models/riskLevelData.interface';
import { CommonService } from 'src/app/services/common.service';
import { RiskLevelsService } from 'src/app/do-nothing/services/risk-levels.service';

@Component({
  selector: 'app-risk-levels-table',
  templateUrl: './risk-levels-table.component.html',
  styleUrls: ['./risk-levels-table.component.scss']
})
export class RiskLevelsTableComponent implements OnInit {
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allRiskLevels: RiskLevelsModel[] = [];
  public shownAllRiskLevels: RiskLevelsModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor(private riskLvlService: RiskLevelsService,
              private router: Router,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.riskLvlService.getAllRiskLevels().subscribe(
      (res: RiskLevelsModel[]) => {
        this.allRiskLevels = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  onEditRow(data: RiskLevelsModel): void {
    this.riskLvlService.onEditRow(data);
    this.router.navigate([AppConfig.routes.edit.configRiskLevels]);
  }

  onDeleteRow(id: number): void {
    if(confirm('Are you sure in delating this config?')) {
      this.isLoading = true;
      this.riskLvlService.deleteRiskLevel(id).subscribe(
        () => {
          this.isLoading = false;
          this.allRiskLevels = this.allRiskLevels.filter( (val) => val['id'] !== id);
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
}
