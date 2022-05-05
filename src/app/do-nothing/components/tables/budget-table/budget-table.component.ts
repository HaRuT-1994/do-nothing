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
  unCheckAll: boolean;
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
      }
    })
   }

  onEditRow(data: BudgetModel, idx: number): void {
    this.index = idx;
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
            this.allBudgets = this.allBudgets.filter( (val) => val['budgetId'] !== id);
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
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => this.unCheckAll = undefined );
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);
      
      this.budgetService.copyBudgets(configIds).subscribe(
        res => {
          this.getAllBudgets();
          this.unCheckAll = false;
          this.checkedData = [];
          this.msgDetails = {msg: 'Copy Budgets ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  deleteBudgets(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: Message.WARNING_DELETE, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => this.unCheckAll = undefined );
      const configIds = this.checkedData.map(el => el.checkedId);

      this.budgetService.deleteBudgets(configIds).subscribe(
        res => {
          this.getAllBudgets();
          this.unCheckAll = false;
          this.checkedData = [];
          this.msgDetails = {msg:  Message.DELETE_SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: BudgetModel, ev, idx: number): void{
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
        this.isLoading = false;
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