import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CurveModel } from 'src/app/do-nothing/models/curveData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigCurvesService } from 'src/app/do-nothing/services/config-curves.service';
import {ConfirmationService} from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';

@Component({
  selector: 'app-curves-table',
  templateUrl: './curves-table.component.html',
  styleUrls: ['./curves-table.component.scss']
})
export class CurvesTableComponent implements OnInit {
  public createPath = AppConfig.routes.add.configCurves;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allCurves: CurveModel[] = [];
  public shownAllCurves: CurveModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private router: Router,
               private curvesService: ConfigCurvesService, 
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.curvesService.getAllCurves().subscribe(
      (res: CurveModel[]) => {
        this.allCurves = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  onEditRow(data: CurveModel): void {
    this.confirmationService.confirm({
      message: 'Are you sure in editing this config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.curvesService.onEditRow(data);
        this.router.navigate([AppConfig.routes.edit.configCurves]);
      }
    });
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure in deleting this config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.curvesService.deleteCurve(id).subscribe(
          () => {
            this.isLoading = false;
            this.allCurves = this.allCurves.filter( (val) => val['id'] !== id);
            this.onPageChange(this.currentPage);
            this.msgDetails = {msg:  Message.DELETE_SUCCESS_MSG, severity: Severity.SUCCESS};
            this.commonService.deleteMsg(this);
          },
          () => {
            this.isLoading = false;
            this.msgDetails = {msg:  Message.ERROR_MSG, severity: Severity.ERROR};
            this.commonService.deleteMsg(this);
          }
        );
      }
    });
  }

  onPageChange(ev): void {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allCurves.length) {
      ev.first -= 10;
    }

    this.shownAllCurves = this.allCurves.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllCurves = this.allCurves.filter(item => {
        for(let key in item) {
          if( item[key] && key !== 'id' && key !== 'cohortId' && key !== 'ScenarioId'
          && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllCurves = this.allCurves;
      this.onPageChange(this.currentPage);
    }
  }
}
