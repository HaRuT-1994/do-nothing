import { Component, OnDestroy, OnInit } from '@angular/core';
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
        this.onPageChange(this.currentPage);
      }
    })
   }

  onEditRow(data: ListsModel, i: number): void {
    this.index = this.currentPage['page'] * this.currentPage['rows'] + i || i;
    this.listsService.onEditRow(data);
    this.commonService.show(ConfigListsComponent);
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
          },
          () => {
            this.isLoading = false;
            this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
          }
        );
      }
    })
  }

  copyLists(): void {
    this.isLoading = true;
    this.listsService.copyLists().subscribe(
       res => {
         this.isLoading = false;
         this.msgDetails = {msg: 'Copy Lists ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
       },
       err => {
         this.isLoading = false;
         this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
       }
    )
  }

  onChecked(item: ListsModel, ev): void{
    if(ev.target.checked) {
      this.listsService.checkedData.push(item.listId);
    } else {
      this.listsService.checkedData = this.listsService.checkedData.filter(el => el !== item.listId)
    }
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
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.isLoading = false;
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
      this.shownAllLists = this.commonService.filterAlgorithm(this.allLists, search);
    } else {
      this.shownAllLists = this.allLists;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
