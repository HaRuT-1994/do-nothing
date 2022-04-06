import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { PoFBandsModel } from 'src/app/do-nothing/models/pofBandData.interface';
import { CommonService } from 'src/app/services/common.service';
import { PofBandsService } from 'src/app/do-nothing/services/pof-bands.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';

@Component({
  selector: 'app-pof-bands-table',
  templateUrl: './pof-bands-table.component.html',
  styleUrls: ['./pof-bands-table.component.scss']
})
export class PoFBandsTableComponent implements OnInit {
  public createPath = AppConfig.routes.add.pofBands;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allPoFBands: PoFBandsModel[] = [];
  public sohwnAllPoFBands: PoFBandsModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private pofBandService: PofBandsService,
               private router: Router,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.pofBandService.getAllPoFBands().subscribe(
      (res: PoFBandsModel[]) => {
        this.allPoFBands = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  onEditRow(data: PoFBandsModel): void {
    this.confirmationService.confirm({
      message: 'Are you sure in editing this config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pofBandService.onEditRow(data);
        this.router.navigate([AppConfig.routes.edit.pofBands]);
      }
    });
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure in delating this config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.pofBandService.deletePoFBand(id).subscribe(
          () => {
            this.isLoading = false;
            this.allPoFBands = this.allPoFBands.filter( (val) => val['id'] !== id);
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

  onPageChange(ev) {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allPoFBands.length) {
      ev.first -= 10;
    }

    this.sohwnAllPoFBands = this.allPoFBands.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.sohwnAllPoFBands = this.allPoFBands.filter(item => {
        for(let key in item) {
          if( item[key] && key !== 'id' && key !== 'scenarioId' && key !== 'cohortId'
          && item[key].toString().toLowerCase().includes(search).toLowerCase()) {
            return item;
          }
        }
      })
    } else {
      this.sohwnAllPoFBands = this.allPoFBands;
      this.onPageChange(this.currentPage);
    }
  }
}
