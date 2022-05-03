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
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-lists-table',
  templateUrl: './lists-table.component.html',
  styleUrls: ['./lists-table.component.scss']
})
export class ListsTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allLists: ListsModel[] = [];
  shownAllLists: ListsModel[] = [];
  unCheckAll: boolean;
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

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
    if(!this.checkedData.length) {
      this.msgDetails = {msg: 'Please check config', severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.listsService.copyLists(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.msgDetails = {msg: 'Copy Lists ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: ListsModel, ev, index: number): void{
    const idx = this.currentPage['page'] * this.currentPage['rows'] + index || index;
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.listId, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.listId)
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
