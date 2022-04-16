import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import { InterventionOptionsModel } from 'src/app/do-nothing/models/interventionOptionsData.interface';
import { ConfigInterventionOptionsService } from 'src/app/do-nothing/services/config-InterventionOptions.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigInterventionOptionsComponent } from '../../addEdit/config-intervention-options/config-intervention-options.component';

@Component({
  selector: 'app-intervention-options-table',
  templateUrl: './intervention-options-table.component.html',
  styleUrls: ['./intervention-options-table.component.scss']
})
export class InterventionOptionsTableComponent implements OnInit {
  public createPath = AppConfig.routes.add.configInterventionOptions;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allInterventionOptions: InterventionOptionsModel[] = [];
  public shownAllInterventionOptions: InterventionOptionsModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private interventionOptionsService: ConfigInterventionOptionsService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

   ngOnInit(): void {
    this.isLoading = true
    this.interventionOptionsService.getAllInterventionOptions().subscribe(
      (res: InterventionOptionsModel[]) => {
        this.allInterventionOptions = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
   }

  onEditRow(data: InterventionOptionsModel): void {
    this.confirmationService.confirm({
      message: 'Edit config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.interventionOptionsService.onEditRow(data);
        this.commonService.show(ConfigInterventionOptionsComponent);
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
        this.interventionOptionsService.deleteInterventionOption(id).subscribe(
          () => {
            this.isLoading = false;
            this.allInterventionOptions = this.allInterventionOptions.filter( (val) => val['interventionId'] !== id);
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

  onPageChange(ev): void {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allInterventionOptions.length) {
      ev.first -= 10;
    }

    this.shownAllInterventionOptions = this.allInterventionOptions.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllInterventionOptions = this.allInterventionOptions.filter(item => {
        for(let key in item) {
          if(item[key] && key !== 'interventionId' && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllInterventionOptions = this.allInterventionOptions;
      this.onPageChange(this.currentPage);
    }
  }
}