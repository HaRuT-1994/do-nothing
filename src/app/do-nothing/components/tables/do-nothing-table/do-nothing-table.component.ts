import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { RunModelHistory } from 'src/app/do-nothing/models/runModelHistory.interface';
import {strToArray} from 'src/app/shared/helper';

@Component({
  selector: 'app-do-nothing-table',
  templateUrl: './do-nothing-table.component.html',
  styleUrls: ['./do-nothing-table.component.scss']
})
export class DoNothingTableComponent implements OnInit, OnDestroy {
  public createPath = AppConfig.routes.add.doNothing;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allModels: ModelConfig[] = [];
  public shownAllModels: ModelConfig[] = [];
  public models: string[] = [];
  private currentPage = {first: 0, rows: 10};
  private checkedData = [];
  private index = 0;
  private sub$: Subscription;

  constructor( private doNothingService: DoNothingService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService,
               private lookupService: LookupService) { }

  ngOnInit(): void {
    this.getAllModelConfigs();
    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllModelConfigs();
      } else {
        console.log(res)
        this.allModels[this.index] = res.value;
        this.shownAllModels[this.index] = res.value;
      }
    })
  }

  onEditRow(data: ModelConfig, i: number): void {
    this.index = i;
    // this.confirmationService.confirm({
    //   message: 'Edit config?',
    //   header: 'Confirmation',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
        this.doNothingService.onEditRow(data);
        this.commonService.show(DoNothingComponent);
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

  runModel(): void {
    this.isLoading = true;
    this.doNothingService.runModel().subscribe(
      res => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Run Model ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.deleteMsg(this);
      },
      err => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.commonService.deleteMsg(this);
      }
    )
  }

  private getAllModelConfigs(): void {
    this.isLoading = true;
    this.doNothingService.getAllModelConfigs().subscribe(
      (res: ModelConfig[]) => {
        this.allModels = res;
        this.isLoading = false;
        this.onPageChange(this.currentPage);
        this.allModels.forEach(el => {
          this.models?.push(el.modelName)
        })
      },
      err => {
        this.isLoading = false;
        console.log(err);
      }
    );
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
    console.log(item)
    const data = strToArray(item['scenariosToRun']);
    if(data.length) {
      this.checkedData.push(...data);
      this.doNothingService.checkedData.scenarioIds = this.checkedData;
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
