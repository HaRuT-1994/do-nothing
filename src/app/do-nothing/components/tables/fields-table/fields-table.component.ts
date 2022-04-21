import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { FieldModel } from 'src/app/do-nothing/models/fieldData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigFieldsService } from 'src/app/do-nothing/services/config-fields.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigFieldsComponent } from '../../addEdit/config-fields/config-fields.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fields-table',
  templateUrl: './fields-table.component.html',
  styleUrls: ['./fields-table.component.scss']
})
export class FieldsTableComponent implements OnInit, OnDestroy {
  public createPath = AppConfig.routes.add.configFields;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allFields: FieldModel[] = [];
  public shownAllFields: FieldModel[] = [];
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;


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
        this.shownAllFields[this.index] = res.value;
      }
    })
  }

  onEditRow(data: FieldModel, i: number): void {
    this.index = i;
    // this.confirmationService.confirm({
    //   message: 'Edit config?',
    //   header: 'Confirmation',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
        this.fieldService.onEditRow(data);
        this.commonService.show(ConfigFieldsComponent);
    //   }
    // });
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

  private getAllFields(): void {
    this.isLoading = true;
    this.fieldService.getAllFields().subscribe(
      (res: FieldModel[]) => {
        this.allFields = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  onPageChange(ev) {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allFields.length) {
      ev.first -= 10;
    }

    this.shownAllFields = this.allFields.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    console.log();
    
    if (search.length) {
      this.shownAllFields = this.allFields.filter(item => {
        for(let key in item) {
          if( item[key] && key !== 'id' && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllFields = this.allFields;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
