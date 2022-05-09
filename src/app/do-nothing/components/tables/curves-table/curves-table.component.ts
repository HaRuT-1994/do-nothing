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
  isLoading: boolean;
  msgDetails: MsgDetails;
  allCurves: CurveModel[] = [];
  isPageChecked: boolean;
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
      }
    })
  }

  onEditRow(data: CurveModel, idx: number): void {
    this.index = idx;
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
    let configIds = [];
    this.allCurves.map(el => el.check && configIds.push(el.id));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;

      this.curvesService.copyCurves(configIds).subscribe(
        res => {
          this.getAllCurves();
          this.msgDetails = {msg: 'Copy Curves ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  deleteCurves(): void {
    let configIds = [];
    this.allCurves.map(el => el.check && configIds.push(el.id));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_DELETE, severity: Severity.WARNING};
    } else {
      this.isLoading = true;

      this.curvesService.deleteCurves(configIds).subscribe(
        res => {
          this.getAllCurves();
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
      this.allCurves[idx].check = true;
    } else {
      this.allCurves[idx].check = false;
    }
  }

  onCheckPage(ev, dt): void {
    for(let i = dt._first; i < dt._first + dt._rows; i++ ) {
      if(i >= this.allCurves.length) {
        break;
      }
      this.onChecked(ev, i);
    }
  }

  paginate(ev): void {
    this.isPageChecked = this.allCurves[ev.first].check ? true : false;
  }

  private getAllCurves(): void {
    this.isLoading = true;
    this.curvesService.getAllCurves().subscribe(
      (res: CurveModel[]) => {
        this.allCurves = res;
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
