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
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-list-values-table',
  templateUrl: './list-values-table.component.html',
  styleUrls: ['./list-values-table.component.scss']
})
export class ListValuesTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allListValues: ListValuesModel[] = [];
  unCheckAll: boolean;
  shownAllListValues: ListValuesModel[] = [];
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

  constructor( private listValluesService: ConfigListValuesService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

   ngOnInit(): void {
    this.getAllListValues();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllListValues();
      } else {
        this.allListValues[this.index] = res.value;
        this.onPageChange(this.currentPage);
      }
    })
   }

  onEditRow(data: ListValuesModel, i: number): void {
    this.index = this.currentPage['page'] * this.currentPage['rows'] + i || i;
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

  copyListValues(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: 'Please check config', severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);
      
      this.listValluesService.copyListValues(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.msgDetails = {msg: 'Copy List Values ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: ListValuesModel, ev, index: number): void{
    const idx = this.currentPage['page'] * this.currentPage['rows'] + index || index;
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.itemId, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.itemId)
    }
  }


  private getAllListValues(): void {
    this.isLoading = true;
    this.listValluesService.getAllListValues().subscribe(
      (res: ListValuesModel[]) => {
        this.allListValues = res;
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
    if(ev.page * ev.rows >= this.allListValues.length) {
      ev.first -= 10;
    }

    this.shownAllListValues = this.allListValues.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllListValues = this.commonService.filterAlgorithm(this.allListValues, search);
    } else {
      this.shownAllListValues = this.allListValues;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
