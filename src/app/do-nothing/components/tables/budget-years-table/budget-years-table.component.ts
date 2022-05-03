import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { BudgetYearsComponent } from '../../addEdit/config-budget-year/config-budget-year.component';
import { ConfigBudgetYearService } from 'src/app/do-nothing/services/config-budget-year.service';
import { BudgetPivotDetails } from 'src/app/do-nothing/models/budgetPivotDetails.interface';
import { BudgetYearsModel } from 'src/app/do-nothing/models/budgetYearsData.interface';
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-years-table.component.html',
  styleUrls: ['./budget-years-table.component.scss']
})
export class BudgetYearsTableComponent implements OnInit {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allBudgetYears: BudgetPivotDetails[] = [];
  unCheckAll: boolean;
  shownAllBudgetYears: BudgetPivotDetails[] = [];
  private currentPage = {first: 0, rows: 10};
  private checkedData: CheckedDataModel[] = [];

  constructor( private budgetYearsService: ConfigBudgetYearService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

   ngOnInit(): void {
    this.getAllBudgetPivotYears();
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

  copyBudgetYears(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: 'Please check config', severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.budgetYearsService.copyBudgetYears(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.msgDetails = {msg: 'Copy Budget Years ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: BudgetYearsModel, ev, index: number): void {
    const idx = this.currentPage['page'] * this.currentPage['rows'] + index || index;
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.BudgetId, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.BudgetId)
    }
  }

  private getAllBudgetPivotYears(): void {
    this.isLoading = true;
    this.budgetYearsService.getAllBudgetYears().subscribe(
      (res: BudgetPivotDetails[]) => {
        this.allBudgetYears = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
        console.log(res);
        
      },
      err => {
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.isLoading = false;
      }
    );
  }

  onPageChange(ev): void {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allBudgetYears.length) {
      ev.first -= 10;
    }

    this.shownAllBudgetYears = this.allBudgetYears.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllBudgetYears = this.commonService.filterAlgorithm(this.allBudgetYears, search);
    } else {
      this.shownAllBudgetYears = this.allBudgetYears;
      this.onPageChange(this.currentPage);
    }
  }
}