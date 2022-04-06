import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { FieldModel } from 'src/app/do-nothing/models/fieldData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigFieldsService } from 'src/app/do-nothing/services/config-fields.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';

@Component({
  selector: 'app-fields-table',
  templateUrl: './fields-table.component.html',
  styleUrls: ['./fields-table.component.scss']
})
export class FieldsTableComponent implements OnInit {
  public createPath = AppConfig.routes.add.configFields;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allFields: FieldModel[] = [];
  public shownAllFields: FieldModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private fieldService: ConfigFieldsService,
               private router: Router,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.isLoading = true
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

  onEditRow(data: FieldModel): void {
    this.confirmationService.confirm({
      message: 'Are you sure in editing this config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.fieldService.onEditRow(data);
        this.router.navigate([AppConfig.routes.edit.configFields]);
      }
    });
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure in deleting this config?',
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
}
