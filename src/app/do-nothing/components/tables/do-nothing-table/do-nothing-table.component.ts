import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ModelConfig } from 'src/app/do-nothing/models/modelConfig.interface';
import { CommonService } from 'src/app/services/common.service';
import { DoNothingService } from 'src/app/do-nothing/services/do-nothing.service';
import {ConfirmationService} from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DoNothingComponent } from '../../addEdit/do-nothing/do-nothing.component';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';

@Component({
  selector: 'app-do-nothing-table',
  templateUrl: './do-nothing-table.component.html',
  styleUrls: ['./do-nothing-table.component.scss']
})
export class DoNothingTableComponent implements OnInit {
  public createPath = AppConfig.routes.add.doNothing;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allModels: ModelConfig[] = [];
  public shownAllModels: ModelConfig[] = [];
  public models: string[] = [];
  private currentPage = {first: 0, rows: 10};
  private checkedData: ModelConfig[] = [];

  constructor( private doNothingService: DoNothingService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService,
               private lookupService: LookupService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.doNothingService.getAllModelConfigs().subscribe(
      (res: ModelConfig[]) => {
        this.allModels = res;
        this.onPageChange(this.currentPage);
        this.allModels.forEach(el => {
          this.models?.push(el.modelName)
        })
        
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  onEditRow(data: ModelConfig): void {
    this.confirmationService.confirm({
      message: 'Edit config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doNothingService.onEditRow(data);
        this.commonService.show(DoNothingComponent);
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
        this.doNothingService.deleteModelConfig(id).subscribe(
          () => {
            this.isLoading = false;
            this.allModels = this.allModels.filter( (val) => val['id'] !== id);
            this.onPageChange(this.currentPage);
            this.msgDetails = {msg:  Message.DELETE_SUCCESS_MSG, severity: Severity.SUCCESS};
            this.commonService.deleteMsg(this);
          },
          () => {
            this.isLoading = false;
            this.msgDetails = {msg:  Message.ERROR_MSG, severity: Severity.ERROR};
            this.commonService.deleteMsg(this);
          }
        );
      }
    });
  }

  onPageChange(ev): void {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allModels.length) {
      ev.first -= 10;
    }

    this.shownAllModels = this.allModels.slice(ev.first, ev.first + ev.rows);
  }

  filterModel(model: string) {
    if (model !== 'All') {
      this.shownAllModels = this.allModels.filter(item => item.modelName === model)
    } else {
      this.shownAllModels = this.allModels;
      this.onPageChange(this.currentPage);
    }
    
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllModels = this.allModels.filter(item => {
        for(let key in item) {
          if( item[key] && key !== 'id' && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllModels = this.allModels;
      this.onPageChange(this.currentPage);
    }
  }

  onChecked(item: ModelConfig) {
    this.checkedData.push(item);
    console.log(this.checkedData);
    
  }
}
