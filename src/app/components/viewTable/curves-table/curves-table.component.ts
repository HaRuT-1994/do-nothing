import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CurveModel } from 'src/app/models/curveData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigCurvesService } from 'src/app/services/config-curves.service';

@Component({
  selector: 'app-curves-table',
  templateUrl: './curves-table.component.html',
  styleUrls: ['./curves-table.component.scss']
})
export class CurvesTableComponent implements OnInit {
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allCurves: CurveModel[] = [];
  public pageN: CurveModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private router: Router,
               private curvesService: ConfigCurvesService, 
               private commonService: CommonService) { }

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
    this.curvesService.onEditRow(data);
    this.router.navigate([AppConfig.routes.edit.configCurves]);
  }

  onDeleteRow(id: number): void {
    if(confirm('Are you sure in delating this config?')) {
      this.isLoading = true;
      this.curvesService.deleteCurve(id).subscribe(
        () => {
          this.isLoading = false;
          this.allCurves = this.allCurves.filter( (val) => val['id'] !== id);
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
    if(!(this.allCurves.length % 10) && (ev.first % 10 !== 0)) {
      ev.first -= 10; 
    }
    this.pageN = this.allCurves;
    this.pageN = this.pageN.slice(ev.first, ev.first + ev.rows);
  }
}
