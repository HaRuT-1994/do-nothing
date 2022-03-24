import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { ListsModel } from 'src/app/do-nothing/models/listsData.interface';
import { ConfigListsService } from 'src/app/do-nothing/services/config-lists.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-lists-table',
  templateUrl: './lists-table.component.html',
  styleUrls: ['./lists-table.component.scss']
})
export class ListsTableComponent implements OnInit {
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allLists: ListsModel[] = [];
  public shownAllListss: ListsModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private listsService: ConfigListsService,
               private router: Router,
               private commonService: CommonService) { }

   ngOnInit(): void {
    this.isLoading = true
    this.listsService.getAllLists().subscribe(
      (res: ListsModel[]) => {
        this.allLists = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
   }

  onEditRow(data: ListsModel): void {
    this.listsService.onEditRow(data);
    this.router.navigate([AppConfig.routes.edit.configLists]);
  }

  onDeleteRow(id: number): void {
    if(confirm('Are you sure in delating this config?')) {
      this.isLoading = true;
      this.listsService.deleteCohort(id).subscribe(
        () => {
          this.isLoading = false;
          this.allLists = this.allLists.filter( (val) => val['listId'] !== id);
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
    if(ev.page * ev.rows >= this.allLists.length) {
      ev.first -= 10;
    }

    this.shownAllListss = this.allLists.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllListss = this.allLists.filter(item => {
        for(let key in item) {
          if(item[key] && key !== 'listId' && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllListss = this.allLists;
      this.onPageChange(this.currentPage);
    }
  }
}
