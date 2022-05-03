import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CurveModel } from 'src/app/do-nothing/models/curveData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigCurvesService } from 'src/app/do-nothing/services/config-curves.service';
import {ConfirmationService} from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigCurvesComponent } from '../../addEdit/config-curves/config-curves.component';
import { Subscription } from 'rxjs';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-curves-table',
  templateUrl: './curves-table.component.html',
  styleUrls: ['./curves-table.component.scss']
})
export class CurvesTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allCurves: CurveModel[] = [];
  shownAllCurves: CurveModel[] = [];
  unCheckAll: boolean;
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];
 
  constructor( private curvesService: ConfigCurvesService, 
               private commonService: CommonService,
               private confirmationService: ConfirmationService,
               private lookup: LookupService) { }

  ngOnInit(): void {
    this.getAllCurves();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllCurves();
      } else {
        this.allCurves[this.index] = res.value;
        this.onPageChange(this.currentPage);
      }
    })
  }

  onEditRow(data: CurveModel, i: number): void {
    this.index = this.currentPage['page'] * this.currentPage['rows'] + i || i;
    this.curvesService.onEditRow(data);
    this.commonService.show(ConfigCurvesComponent);
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
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
          },
          () => {
            this.isLoading = false;
            this.msgDetails = {msg:  Message.ERROR_MSG, severity: Severity.ERROR};
          }
        );
      }
    });
  }

  copyCurves(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: 'Please check config', severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.curvesService.copyCurves(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.msgDetails = {msg: 'Copy Curves ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: CurveModel, ev, index: number): void{
    const idx = this.currentPage['page'] * this.currentPage['rows'] + index || index;
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.id, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.id)
    }
  }

  private getAllCurves(): void {
    this.isLoading = true;
    this.curvesService.getAllCurves().subscribe(
      (res: CurveModel[]) => {
        this.allCurves = res;
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
    if(ev.page * ev.rows >= this.allCurves.length) {
      ev.first -= 10;
    }

    this.shownAllCurves = this.allCurves.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllCurves = this.commonService.filterAlgorithm(this.allCurves, search);
    } else {
      this.shownAllCurves = this.allCurves;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
