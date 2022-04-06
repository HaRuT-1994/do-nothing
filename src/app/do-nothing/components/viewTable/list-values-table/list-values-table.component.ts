import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { ListValuesModel } from 'src/app/do-nothing/models/listValuesData.interface';
import { ConfigListValuesService } from 'src/app/do-nothing/services/config-listValues.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';

@Component({
  selector: 'app-list-values-table',
  templateUrl: './list-values-table.component.html',
  styleUrls: ['./list-values-table.component.scss']
})
export class ListValuesTableComponent implements OnInit {
  public createPath = AppConfig.routes.add.configListValues;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allListValues: ListValuesModel[] = [];
  public shownAllListValues: ListValuesModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private listValluesService: ConfigListValuesService,
               private router: Router,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

   ngOnInit(): void {
    this.isLoading = true
    this.listValluesService.getAllListValues().subscribe(
      (res: ListValuesModel[]) => {
        this.allListValues = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
   }

  onEditRow(data: ListValuesModel): void {
    this.confirmationService.confirm({
      message: 'Are you sure in editing this config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listValluesService.onEditRow(data);
        this.router.navigate([AppConfig.routes.edit.configListValues]);
      }
    });
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure in deleteing this config?',
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

  onPageChange(ev): void {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allListValues.length) {
      ev.first -= 10;
    }

    this.shownAllListValues = this.allListValues.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllListValues = this.allListValues.filter(item => {
        for(let key in item) {
          if(item[key] && key !== 'itemId' && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllListValues = this.allListValues;
      this.onPageChange(this.currentPage);
    }
  }
}
