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

@Component({
  selector: 'app-curves-table',
  templateUrl: './curves-table.component.html',
  styleUrls: ['./curves-table.component.scss']
})
export class CurvesTableComponent implements OnInit, OnDestroy {
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allCurves: CurveModel[] = [];
  public shownAllCurves: CurveModel[] = [];
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;

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
        this.shownAllCurves[this.index] = res.value;
      }
    })
  }

  onEditRow(data: CurveModel, i: number): void {
    this.index = i;
    // this.confirmationService.confirm({
    //   message: 'Edit config?',
    //   header: 'Confirmation',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
        this.curvesService.onEditRow(data);
        this.commonService.show(ConfigCurvesComponent);
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
    this.isLoading = true;
    this.curvesService.copyCurves().subscribe(
       res => {
         this.isLoading = false;
         this.msgDetails = {msg: 'Copy Curves ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
       },
       err => {
         this.isLoading = false;
         this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
       }
    )
  }

  onChecked(item: CurveModel, ev): void{
    if(ev.target.checked) {
      this.curvesService.checkedData.push(item.id);
    } else {
      this.curvesService.checkedData = this.curvesService.checkedData.filter(el => el !== item.id)
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
        console.log(err);
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

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
