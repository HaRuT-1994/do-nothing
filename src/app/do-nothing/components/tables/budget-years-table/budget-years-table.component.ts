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
import { Subscription } from 'rxjs';

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
  private checkedData: CheckedDataModel[] = [];
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
    if(!this.checkedData.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => this.unCheckAll = undefined );
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.budgetYearsService.copyBudgetYears(configIds).subscribe(
        res => {
          this.getAllBudgetPivotYears();
          this.unCheckAll = false;
          this.checkedData = [];
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
    if(!this.checkedData.length) {
      this.msgDetails = {msg: Message.WARNING_DELETE, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => this.unCheckAll = undefined );
      const configIds = this.checkedData.map(el => el.checkedId);

      this.budgetYearsService.deleteBudgetYears(configIds).subscribe(
        res => {
          this.getAllBudgetPivotYears();
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

  onChecked(item: BudgetYearsModel, ev, idx: number): void {
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
        this.isLoading = false;
      },
      err => {
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.isLoading = false;
      }
    );
  }
}