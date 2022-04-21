import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import { ListsModel } from 'src/app/do-nothing/models/listsData.interface';
import { ConfigListsService } from 'src/app/do-nothing/services/config-lists.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigListsComponent } from '../../addEdit/config-lists/config-lists.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lists-table',
  templateUrl: './lists-table.component.html',
  styleUrls: ['./lists-table.component.scss']
})
export class ListsTableComponent implements OnInit, OnDestroy {
  public createPath = AppConfig.routes.add.configLists;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allLists: ListsModel[] = [];
  public shownAllLists: ListsModel[] = [];
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;

  constructor( private listsService: ConfigListsService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

   ngOnInit(): void {
    this.getAllLists();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllLists();
      } else {
        this.allLists[this.index] = res.value;
        this.shownAllLists[this.index] = res.value;
      }
    })
   }

  onEditRow(data: ListsModel, i: number): void {
    this.index = i;
    // this.confirmationService.confirm({
    //   message: 'Edit config?',
    //   header: 'Confirmation',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
        this.listsService.onEditRow(data);
        this.commonService.show(ConfigListsComponent);
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
        this.listsService.deleteCohort(id).subscribe(
          () => {
            this.isLoading = false;
            this.allLists = this.allLists.filter( (val) => val['listId'] !== id);
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
    })
  }

  private getAllLists(): void {
    this.isLoading = true;
    this.listsService.getAllLists().subscribe(
      (res: ListsModel[]) => {
        this.allLists = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
  

  onPageChange(ev): void {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allLists.length) {
      ev.first -= 10;
    }

    this.shownAllLists = this.allLists.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllLists = this.allLists.filter(item => {
        for(let key in item) {
          if(item[key] && key !== 'listId' && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllLists = this.allLists;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
