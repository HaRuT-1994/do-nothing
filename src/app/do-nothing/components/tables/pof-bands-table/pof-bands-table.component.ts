import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { PoFBandsModel } from 'src/app/do-nothing/models/pofBandData.interface';
import { CommonService } from 'src/app/services/common.service';
import { PofBandsService } from 'src/app/do-nothing/services/pof-bands.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { PofBandsComponent } from '../../addEdit/pof-bands/pof-bands.component';
import { Subscription } from 'rxjs';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-pof-bands-table',
  templateUrl: './pof-bands-table.component.html',
  styleUrls: ['./pof-bands-table.component.scss']
})
export class PoFBandsTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allPoFBands: PoFBandsModel[] = [];
  unCheckAll: boolean;
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

  constructor( private pofBandService: PofBandsService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService,
               private lookup: LookupService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.getAllPoFBands();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllPoFBands();
      } else {
        this.allPoFBands[this.index] = res.value;
      }
    })
  }

  onEditRow(data: PoFBandsModel, idx: number): void {
    this.index = idx;
    this.pofBandService.onEditRow(data);
    this.commonService.show(PofBandsComponent);
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.pofBandService.deletePoFBand(id).subscribe(
          () => {
            this.isLoading = false;
            this.allPoFBands = this.allPoFBands.filter( (val) => val['id'] !== id);
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

  copyPoFBands(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.pofBandService.copyPoFBands(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.checkedData = [];
          this.msgDetails = {msg: 'Copy PoFBands ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: PoFBandsModel, ev, idx: number): void{
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.id, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.id)
    }
  }

  private getAllPoFBands(): void {
    this.isLoading = true;
    this.pofBandService.getAllPoFBands().subscribe(
      (res: PoFBandsModel[]) => {
        this.allPoFBands = res;
        this.isLoading = false;
      },
      err => {
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
