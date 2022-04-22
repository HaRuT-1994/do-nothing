import { Component, OnInit } from '@angular/core';
import { BudgetModel } from 'src/app/do-nothing/models/budgetData.interface';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { BudgetYearsComponent } from '../../addEdit/config-budget-year/config-budget-year.component';
import { ConfigBudgetYearService } from 'src/app/do-nothing/services/config-budget-year.service';
import { BudgetPivotDetails } from 'src/app/do-nothing/models/budgetPivotDetails.interface';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-years-table.component.html',
  styleUrls: ['./budget-years-table.component.scss']
})
export class BudgetYearsTableComponent implements OnInit {
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allBudgets: BudgetPivotDetails[] = [];
  public shownAllBudgets: BudgetPivotDetails[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private budgetYearsService: ConfigBudgetYearService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

   ngOnInit(): void {
    this.getAllBudgetPivotYears();
   }

  onEditRow(data: BudgetModel): void {
   // console.log(data);
    
    this.budgetYearsService.onEditRow(data);
    this.commonService.show(BudgetYearsComponent);
    // this.confirmationService.confirm({
    //   message: 'Edit config?',
    //   header: 'Confirmation',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
       
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
        this.budgetYearsService.deleteBudgetYear(id).subscribe(
          () => {
            this.isLoading = false;
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

  private getAllBudgetPivotYears(): void {
    this.isLoading = true;
    this.budgetYearsService.getAllBudgetYears().subscribe(
      (res: BudgetPivotDetails[]) => {
        this.allBudgets = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
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
      this.shownAllBudgets = this.allBudgets.filter(item => {
        for(let key in item) {
          if(item[key] && key !== 'budgetId' && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllBudgets = this.allBudgets;
      this.onPageChange(this.currentPage);
    }
  }
}