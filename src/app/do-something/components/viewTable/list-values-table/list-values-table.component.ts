import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { ListValuesModel } from 'src/app/do-something/models/listValuesData.interface';
import { ConfigListValuesService } from 'src/app/do-something/services/config-listValues.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-list-values-table',
  templateUrl: './list-values-table.component.html',
  styleUrls: ['./list-values-table.component.scss']
})
export class ListValuesTableComponent implements OnInit {
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allListValues: ListValuesModel[] = [];
  public shownAllListValues: ListValuesModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private listValluesService: ConfigListValuesService,
               private router: Router,
               private commonService: CommonService) { }

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
    this.listValluesService.onEditRow(data);
    this.router.navigate([AppConfig.routes.edit.configListValues]);
  }

  onDeleteRow(id: number): void {
    if(confirm('Are you sure in delating this config?')) {
      this.isLoading = true;
      this.listValluesService.deleteListValues(id).subscribe(
        () => {
          this.isLoading = false;
          this.allListValues = this.allListValues.filter( (val) => val['itemId'] !== id);
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
          if(key !== 'itemId' && item[key] !== null && item[key].toString().includes(search)) {
            return item;
          }
        }
      })
    } else {
      this.shownAllListValues = this.allListValues;
      this.onPageChange({first: 0, rows: 10});
    }
  }
}
