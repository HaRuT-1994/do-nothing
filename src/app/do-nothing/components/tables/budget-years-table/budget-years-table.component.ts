import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { BudgetYearsComponent } from '../../addEdit/config-budget-year/config-budget-year.component';
import { ConfigBudgetYearService } from 'src/app/do-nothing/services/config-budget-year.service';
import { BudgetPivotDetails } from 'src/app/do-nothing/models/budgetPivotDetails.interface';
import { BudgetYearsModel } from 'src/app/do-nothing/models/budgetYearsData.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-years-table.component.html',
  styleUrls: ['./budget-years-table.component.scss']
})
export class BudgetYearsTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allBudgetYears: BudgetPivotDetails[] = [];
  isPageChecked: boolean;
  private sub$: Subscription;

  constructor( private budgetYearsService: ConfigBudgetYearService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

   ngOnInit(): void {
    this.getAllBudgetPivotYears();

    this.sub$ = this.commonService.getData().subscribe(res => { this.getAllBudgetPivotYears() })
   }

  onEditRow(data: BudgetYearsModel): void {
    this.budgetYearsService.onEditRow(data);
    this.commonService.show(BudgetYearsComponent);
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.budgetYearsService.deleteBudgetYear(id).subscribe(
          () => {
            this.isLoading = false;
            this.allBudgetYears = this.allBudgetYears.filter( (val) => val['BudgetId'] !== id);
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

  copyBudgetYears(): void {
    let configIds = [];
    this.allBudgetYears.map(el => el.check && configIds.push(el.BudgetId));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;

      this.budgetYearsService.copyBudgetYears(configIds).subscribe(
        res => {
          this.getAllBudgetPivotYears();
          this.msgDetails = {msg: 'Copy Budget Years ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  deleteBudgetYears(): void {
    let configIds = [];
    this.allBudgetYears.map(el => el.check && configIds.push(el.BudgetId));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_DELETE, severity: Severity.WARNING};
    } else {
      this.isLoading = true;

      this.budgetYearsService.deleteBudgetYears(configIds).subscribe(
        res => {
          this.getAllBudgetPivotYears();
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
      this.allBudgetYears[idx].check = true;
    } else {
      this.allBudgetYears[idx].check = false;
    }
  }

  onCheckPage(ev, dt): void {
    for(let i = dt._first; i < dt._first + dt._rows; i++ ) {
      if(i >= this.allBudgetYears.length) {
        break;
      }
      this.onChecked(ev, i);
    }
  }

  paginate(ev): void {
    this.isPageChecked = this.allBudgetYears[ev.first].check ? true : false;
  }

  private getAllBudgetPivotYears(): void {
    this.isLoading = true;
    this.budgetYearsService.getAllBudgetYears().subscribe(
      (res: BudgetPivotDetails[]) => {
        this.allBudgetYears = res;
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