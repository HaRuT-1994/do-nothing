import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { BudgetModel } from 'src/app/do-nothing/models/budgetData.interface';
import { ConfigBudgetService } from 'src/app/do-nothing/services/config-budget.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements OnInit {
  public createPath = AppConfig.routes.add.configBudget;
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allBudgets: BudgetModel[] = [];
  public shownAllBudgets: BudgetModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private budgetService: ConfigBudgetService,
               private router: Router,
               private commonService: CommonService) { }

   ngOnInit(): void {
    this.isLoading = true
    this.budgetService.getAllBudgets().subscribe(
      (res: BudgetModel[]) => {
        this.allBudgets = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
   }

  onEditRow(data: BudgetModel): void {
    if(confirm('Are you sure in editing this config?')) {
      this.budgetService.onEditRow(data);
      this.router.navigate([AppConfig.routes.edit.configBudget]);
    }
  }

  onDeleteRow(id: number): void {
    if(confirm('Are you sure in delating this config?')) {
      this.isLoading = true;
      this.budgetService.deleteBudget(id).subscribe(
        () => {
          this.isLoading = false;
          this.allBudgets = this.allBudgets.filter( (val) => val['budgetId'] !== id);
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