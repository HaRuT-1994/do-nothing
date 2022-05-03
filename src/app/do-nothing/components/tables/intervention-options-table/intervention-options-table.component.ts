import { Component, OnInit } from '@angular/core';
import { InterventionOptionsModel } from 'src/app/do-nothing/models/interventionOptionsData.interface';
import { ConfigInterventionOptionsService } from 'src/app/do-nothing/services/config-InterventionOptions.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigInterventionOptionsComponent } from '../../addEdit/config-intervention-options/config-intervention-options.component';
import { Subscription } from 'rxjs';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-intervention-options-table',
  templateUrl: './intervention-options-table.component.html',
  styleUrls: ['./intervention-options-table.component.scss']
})
export class InterventionOptionsTableComponent implements OnInit {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allInterventionOptions: InterventionOptionsModel[] = [];
  shownAllInterventionOptions: InterventionOptionsModel[] = [];
  unCheckAll: boolean;
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

  constructor( private interventionOptionsService: ConfigInterventionOptionsService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService,
               private lookup: LookupService) { }

   ngOnInit(): void {
    this.getAllInterventionOptions();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllInterventionOptions();
      } else {
        this.allInterventionOptions[this.index] = res.value;
        this.onPageChange(this.currentPage);
      }
      
    })
   }

  onEditRow(data: InterventionOptionsModel, i: number): void {
    this.index = this.currentPage['page'] * this.currentPage['rows'] + i || i;
    this.interventionOptionsService.onEditRow(data);
    this.commonService.show(ConfigInterventionOptionsComponent);
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
          },
          () => {
            this.isLoading = false;
            this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
          }
        );
      }
    });
  }

  copyIntOptions(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: 'Please check config', severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.interventionOptionsService.copyIntOptions(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.msgDetails = {msg: 'Copy Intervention Options ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: InterventionOptionsModel, ev, index: number): void{
    const idx = this.currentPage['page'] * this.currentPage['rows'] + index || index;
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.interventionId, index: idx});
    } else {
      this.checkedData = this.checkedData
        .filter(el => el.checkedId !== item.interventionId)
    }
  }

  private getAllInterventionOptions(): void {
    this.isLoading = true;
    this.interventionOptionsService.getAllInterventionOptions().subscribe(
      (res: InterventionOptionsModel[]) => {
        this.allInterventionOptions = res;
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
    if(ev.page * ev.rows >= this.allInterventionOptions.length) {
      ev.first -= 10;
    }

    this.shownAllInterventionOptions = this.allInterventionOptions.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllInterventionOptions = this.commonService.filterAlgorithm(this.allInterventionOptions, search);
    } else {
      this.shownAllInterventionOptions = this.allInterventionOptions;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
