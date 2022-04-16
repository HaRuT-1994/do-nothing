import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
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

@Component({
  selector: 'app-rates-table',
  templateUrl: './rates-table.component.html',
  styleUrls: ['./rates-table.component.scss']
})
export class RatesTableComponent implements OnInit, OnDestroy {
  public createPath = AppConfig.routes.add.configRates;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allRates: RatesModel[];
  public shownAllRates: RatesModel[];
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;

  constructor( private rateService: ConfigRatesService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService,
               private lookup: LookupService) { }

   ngOnInit(): void {
    this.isLoading = true
    this.getAllRates();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(res[1]) {
        this.getAllRates();
      } else {
        this.allRates[this.index] = res[0]?.value;
        this.shownAllRates[this.index] = res[0]?.value;
      }
      
    })
   }

  onEditRow(data: RatesModel, i: number): void {
    this.index = i;
    this.confirmationService.confirm({
      message: 'Edit config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rateService.onEditRow(data);
        this.commonService.show(ConfigRatesComponent);
      }
    });
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
            this.commonService.deleteMsg(this);
          },
          () => {
            this.isLoading = false;
            this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
            this.commonService.deleteMsg(this);
          }
        );
      }
    });
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
        console.log(err);
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
      this.shownAllRates = this.allRates.filter(item => {
        for(let key in item) {
          if(item[key] && key !== 'decisionId' && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllRates = this.allRates;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
