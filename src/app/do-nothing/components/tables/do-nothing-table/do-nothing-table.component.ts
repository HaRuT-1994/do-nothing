import { Component, OnDestroy, OnInit } from '@angular/core';
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
import {strToArray} from 'src/app/shared/helper';
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-do-nothing-table',
  templateUrl: './do-nothing-table.component.html',
  styleUrls: ['./do-nothing-table.component.scss']
})
export class DoNothingTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allModels: ModelConfig[] = [];
  shownAllModels: ModelConfig[] = [];
  models = [];
  unCheckAll: boolean;
  private currentPage = {first: 0, rows: 10};
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

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
        this.allModels[this.index] = res.value;
        this.onPageChange(this.currentPage);
      }
    })
  }

  onEditRow(data: ModelConfig, i: number): void {
    this.index = this.currentPage['page'] * this.currentPage['rows'] + i || i;
    this.doNothingService.onEditRow(data);
    this.commonService.show(DoNothingComponent);
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
          },
          () => {
            this.isLoading = false;
            this.msgDetails = {msg:  Message.ERROR_MSG, severity: Severity.ERROR};
          }
        );
      }
    });
  }

  runModel(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: 'Please check config', severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.doNothingService.runModel(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.unCheckAll = false;
          this.msgDetails = {msg: 'Run Model ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  copyModel(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: 'Please check config', severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.unCheckAll = undefined;
      }, 0);
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);
      
      this.doNothingService.copyModel(configIds).subscribe(
          res => {
            this.isLoading = false;
            this.unCheckAll = false;
            this.msgDetails = {msg: 'Copy Model ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
          },
          err => {
            this.isLoading = false;
            this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
          }
      )
    }
  }

  onChecked(item: ModelConfig, ev, index: number): void {
    const data = strToArray(item['scenariosToRun']);
    const idx = this.currentPage['page'] * this.currentPage['rows'] + index || index;
    if(ev.target.checked) {
      this.checkedData.push({checkedId: {
        configurationId: item.id,
        scenarioIds: data
      }, index: idx})
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId.configurationId !== item.id)
    }
  }

  private getAllModelConfigs(): void {
    this.isLoading = true;
    this.doNothingService.getAllModelConfigs().subscribe(
      (res: ModelConfig[]) => {
        this.allModels = res;
        this.isLoading = false;
        this.onPageChange(this.currentPage);
        let setModels = new Set();
        this.allModels.forEach(el => {
          setModels.add(el.modelName)
        })
        this.models = Array.from(setModels);
        this.models.unshift('All');
      },
      err => {
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.isLoading = false;
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
      this.shownAllModels = this.commonService.filterAlgorithm(this.allModels, search);
    } else {
      this.shownAllModels = this.allModels;
      this.onPageChange(this.currentPage);
    }
  }

  ngOnDestroy(): void{
    this.sub$.unsubscribe();
  }
}
