import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { FieldModel } from 'src/app/do-nothing/models/fieldData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigFieldsService } from 'src/app/do-nothing/services/config-fields.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigFieldsComponent } from '../../addEdit/config-fields/config-fields.component';
import { Subscription } from 'rxjs';
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-fields-table',
  templateUrl: './fields-table.component.html',
  styleUrls: ['./fields-table.component.scss']
})
export class FieldsTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allFields: FieldModel[] = [];
  unCheckAll: boolean;
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

  constructor( private fieldService: ConfigFieldsService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getAllFields();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllFields();
      } else {
        this.allFields[this.index] = res.value;
      }
    })
  }

  onEditRow(data: FieldModel, idx: number): void {
    this.index = idx;
    this.fieldService.onEditRow(data);
    this.commonService.show(ConfigFieldsComponent);
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.fieldService.deleteField(id).subscribe(
          () => {
            this.isLoading = false;
            this.allFields = this.allFields.filter( (val) => val['id'] !== id);
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

  copyFields(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.fieldService.copyFields(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.checkedData = [];
          this.msgDetails = {msg: 'Copy Fields ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: FieldModel, ev, idx: number): void{
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.id, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.id)
    }
  }

  private getAllFields(): void {
    this.isLoading = true;
    this.fieldService.getAllFields().subscribe(
      (res: FieldModel[]) => {
        this.allFields = res;
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
