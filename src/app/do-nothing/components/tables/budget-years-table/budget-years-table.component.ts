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
  index: number = -1;
  private sub$: Subscription;
  years = ['_2022', '_2023', '_2024', '_2025', '_2026', '_2027', '_2028', '_2029', '_2030', '_2031', '_2032', '_2033', '_2034', '_2035', '_2036', '_2037', '_2038', '_2039', '_2040', '_2041', '_2042', '_2043', '_2044', '_2045', '_2046', '_2047', '_2048', '_2049', '_2050', '_2051', '_2052', '_2053', '_2054', '_2055', '_2056', '_2057', '_2058', '_2059', '_2060', '_2061', '_2062', '_2063', '_2064', '_2065', '_2066', '_2067', '_2068', '_2069', '_2070', '_2071'];

  constructor( private budgetYearsService: ConfigBudgetYearService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

   ngOnInit(): void {
    this.getAllBudgetPivotYears();

    this.sub$ = this.commonService.getData().subscribe(res => { this.getAllBudgetPivotYears() })
   }

  onEditRow(index: number): void {
    // console.log(index);
    // this.budgetYearsService.onEditRow(data);
    // this.commonService.show(BudgetYearsComponent);
    if(index === this.index) {
      console.log(index);
      this.index = -1;
    } else {
      this.index = index;
    }
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.budgetYearsService.deleteBudgetYearByBudgetId(id).subscribe(
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