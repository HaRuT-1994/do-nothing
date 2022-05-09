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

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allBudgets: BudgetModel[];
  isPageChecked: boolean;
  private index = 0;
  private sub$: Subscription;


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
    let configIds = [];
    this.allBudgets.map(el => el.check && configIds.push(el.budgetId));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      
      this.budgetService.copyBudgets(configIds).subscribe(
        res => {
          this.getAllBudgets();
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
    let configIds = [];
    this.allBudgets.map(el => el.check && configIds.push(el.budgetId));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_DELETE, severity: Severity.WARNING};
    } else {
      this.isLoading = true;

      this.budgetService.deleteBudgets(configIds).subscribe(
        res => {
          this.getAllBudgets();
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
      this.allBudgets[idx].check = true;
    } else {
      this.allBudgets[idx].check = false;
    }
  }

  onCheckPage(ev, dt): void {
    for(let i = dt._first; i < dt._first + dt._rows; i++ ) {
      if(i >= this.allBudgets.length) {
        break;
      }
      this.onChecked(ev, i);
    }
  }

  paginate(ev): void {
    this.isPageChecked = this.allBudgets[ev.first].check ? true : false;
  }

  private getAllBudgets(): void {
    this.isLoading = true;
    this.budgetService.getAllBudgets().subscribe(
      (res: BudgetModel[]) => {
        this.allBudgets = res;
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