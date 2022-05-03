import { Component, OnDestroy, OnInit } from '@angular/core';
import { BudgetModel } from 'src/app/do-nothing/models/budgetData.interface';
import { ConfigBudgetService } from 'src/app/do-nothing/services/config-budget.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigBudgetComponent } from '../../addEdit/config-budget/config-budget.component';
import { Subscription } from 'rxjs';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allBudgets: BudgetModel[];
  shownAllBudgets: BudgetModel[];
  unCheckAll: boolean;
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

  constructor( private budgetService: ConfigBudgetService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService,
               private lookup: LookupService) { }

   ngOnInit(): void {
    this.getAllBudgets();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllBudgets();
      } else {
        this.allBudgets[this.index] = res.value;
        this.onPageChange(this.currentPage);
      }
    })
   }

  onEditRow(data: BudgetModel, i: number): void {
    this.index = this.currentPage['page'] * this.currentPage['rows'] + i || i;
    this.budgetService.onEditRow(data);
    this.commonService.show(ConfigBudgetComponent);
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.budgetService.deleteBudget(id).subscribe(
          () => {
            this.isLoading = false;
            console.log(this.allBudgets);
            
            this.allBudgets = this.allBudgets.filter( (val) => val['budgetId'] !== id);
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

  copyBudgets(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: 'Please check config', severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);
      
      this.budgetService.copyBudgets(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.msgDetails = {msg: 'Copy Budgets ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: BudgetModel, ev, index: number): void{
    const idx = this.currentPage['page'] * this.currentPage['rows'] + index || index;
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.budgetId, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.budgetId)
    }
  }

  private getAllBudgets(): void {
    this.isLoading = true;
    this.budgetService.getAllBudgets().subscribe(
      (res: BudgetModel[]) => {
        this.allBudgets = res;
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
    if(ev.page * ev.rows >= this.allBudgets.length) {
      ev.first -= 10;
    }

    this.shownAllBudgets = this.allBudgets.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllBudgets = this.commonService.filterAlgorithm(this.allBudgets, search);
    } else {
      this.shownAllBudgets = this.allBudgets;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}