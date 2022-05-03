import { Component, OnDestroy, OnInit } from '@angular/core';
import { RatesModel } from 'src/app/do-nothing/models/ratesData.interface';
import { ConfigRatesService } from 'src/app/do-nothing/services/config-rates.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigRatesComponent } from '../../addEdit/config-rates/config-rates.component';
import { Subscription } from 'rxjs';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-rates-table',
  templateUrl: './rates-table.component.html',
  styleUrls: ['./rates-table.component.scss']
})
export class RatesTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allRates: RatesModel[] = [];
  shownAllRates: RatesModel[] = [];
  unCheckAll: boolean;
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

  constructor( private rateService: ConfigRatesService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService,
               private lookup: LookupService) { }

   ngOnInit(): void {
    this.isLoading = true
    this.getAllRates();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllRates();
      } else {
        this.allRates[this.index] = res.value;
        this.onPageChange(this.currentPage);
      }
    })
   }

  onEditRow(data: RatesModel, i: number): void {
    this.index = this.currentPage['page'] * this.currentPage['rows'] + i || i;
    this.rateService.onEditRow(data);
    this.commonService.show(ConfigRatesComponent);
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.rateService.deleteRate(id).subscribe(
          () => {
            this.isLoading = false;
            this.allRates = this.allRates.filter( (val) => val['ratesId'] !== id);
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

   copyRates(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: 'Please check config', severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);
      
      this.rateService.copyRates(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.msgDetails = {msg: 'Copy Rates ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: RatesModel, ev, index: number): void{
    const idx = this.currentPage['page'] * this.currentPage['rows'] + index || index;
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.ratesId, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.ratesId)
    }
  }

   private getAllRates(): void{
     this.isLoading = true;
     this.rateService.getAllRates().subscribe(
      (res: RatesModel[]) => {
        this.allRates = res;
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
    if(ev.page * ev.rows >= this.allRates.length) {
      ev.first -= 10;
    }

    this.shownAllRates = this.allRates.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllRates = this.commonService.filterAlgorithm(this.allRates, search);
    } else {
      this.shownAllRates = this.allRates;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
