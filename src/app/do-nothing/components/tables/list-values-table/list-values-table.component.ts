import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListValuesModel } from 'src/app/do-nothing/models/listValuesData.interface';
import { ConfigListValuesService } from 'src/app/do-nothing/services/config-listValues.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigListValuesComponent } from '../../addEdit/config-list-values/config-list-values.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-values-table',
  templateUrl: './list-values-table.component.html',
  styleUrls: ['./list-values-table.component.scss']
})
export class ListValuesTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allListValues: ListValuesModel[] = [];
  isPageChecked: boolean;
  private sub$: Subscription;

  constructor( private listValluesService: ConfigListValuesService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

   ngOnInit(): void {
    this.getAllListValues();

    this.sub$ = this.commonService.getData().subscribe(res => this.getAllListValues() )
   }

  onEditRow(data: ListValuesModel): void {
    this.listValluesService.onEditRow(data);
    this.commonService.show(ConfigListValuesComponent);
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.listValluesService.deleteListValues(id).subscribe(
          () => {
            this.isLoading = false;
            this.allListValues = this.allListValues.filter( (val) => val['itemId'] !== id);
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

  copyListValues(): void {
    let configIds = [];
    this.allListValues.map(el => el.check && configIds.push(el.itemId));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      
      this.listValluesService.copyListValues(configIds).subscribe(
        res => {
          this.getAllListValues();
          this.msgDetails = {msg: 'Copy List Values ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  deleteListValues(): void {
    let configIds = [];
    this.allListValues.map(el => el.check && configIds.push(el.itemId));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_DELETE, severity: Severity.WARNING};
    } else {
      this.isLoading = true;

      this.listValluesService.deletListValues(configIds).subscribe(
        res => {
          this.getAllListValues();
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
      this.allListValues[idx].check = true;
    } else {
      this.allListValues[idx].check = false;
    }
  }

  onCheckPage(ev, dt): void {
    for(let i = dt._first; i < dt._first + dt._rows; i++ ) {
      if(i >= this.allListValues.length) {
        break;
      }
      this.onChecked(ev, i);
    }
  }

  paginate(ev): void {
    this.isPageChecked = this.allListValues[ev.first].check ? true : false;
  }

  private getAllListValues(): void {
    this.isLoading = true;
    this.listValluesService.getAllListValues().subscribe(
      (res: ListValuesModel[]) => {
        this.allListValues = res;
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
