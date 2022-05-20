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
import { ExportModelComponent } from './export-model/export-model.component';
import { ConfigData } from 'src/app/models/configData.interface';

@Component({
  selector: 'app-do-nothing-table',
  templateUrl: './do-nothing-table.component.html',
  styleUrls: ['./do-nothing-table.component.scss']
})
export class DoNothingTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  models = [];
  isPageChecked: boolean;
  allModels: ModelConfig[] = [];
  private defaultModels: ModelConfig[] = [];
  private sub$: Subscription;

  constructor( private doNothingService: DoNothingService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService,
               private lookupService: LookupService) { }

  ngOnInit(): void {
    this.getAllModelConfigs();
    this.sub$ = this.commonService.getData().subscribe(() => this.getAllModelConfigs() )
  }

  onEditRow(data: ModelConfig): void {
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
    let configIds = [];
    this.allModels.map(el => el.check && configIds.push(el.check));
    
    if(!configIds.length) {
      this.msgDetails = {msg: 'Nothing has been selected to run', severity: Severity.WARNING};
    } else {
      this.isLoading = true;

      this.doNothingService.runModel(configIds).subscribe(
        res => {
          this.isLoading = false;
          this.isPageChecked = false;
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
    let configIds = [];
    this.allModels.map(el => el.check && configIds.push(el.id));
    
    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      
      this.doNothingService.copyModel(configIds).subscribe(
          res => {
            this.getAllModelConfigs();
            this.msgDetails = {msg: 'Copy Model ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
          },
          err => {
            this.isLoading = false;
            this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
          }
      )
    }
  }

  deleteModels(): void {
    let configIds = [];
    this.allModels.map(el => el.check && configIds.push(el.id));

    if(!configIds.length) {
      this.msgDetails = {msg: Message.WARNING_DELETE, severity: Severity.WARNING};
    } else {
      this.isLoading = true;

      this.doNothingService.deleteModels(configIds).subscribe(
        res => {
          this.getAllModelConfigs();
          this.msgDetails = {msg:  Message.DELETE_SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(ev, idx: number): void{
    const data = strToArray(this.allModels[idx]['scenariosToRun']);
    if(ev.target.checked) {
      this.allModels[idx].check = { configurationId: this.allModels[idx].id, scenarioIds: data };
    } else {
      this.allModels[idx].check = null;
    }
  }

  onCheckPage(ev, dt): void {
    for(let i = dt._first; i < dt._first + dt._rows; i++ ) {
      if(i >= this.allModels.length) {
        break;
      }
      this.onChecked(ev, i);
    }
  }

  paginate(ev): void {
    this.isPageChecked = this.allModels[ev.first].check ? true : false;
  }

  exportModel(): void {
    const models: ConfigData[] = [];
    const scenarios = [];
    this.allModels.forEach(config => {
      models.push({
        id: config.id,
        value: config.modelName
      });
      scenarios.push({
        id: config.scenariosToRun,
        value: config.scenarioName
      });
    });
     
    this.commonService.show(ExportModelComponent, {models, scenarios});
  }

  private getAllModelConfigs(): void {
    this.isLoading = true;
    this.doNothingService.getAllModelConfigs().subscribe(
      (res: ModelConfig[]) => {
        this.allModels = res;
        this.defaultModels = res;
        this.isLoading = false;
        this.isPageChecked = false;
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

  filterModel(model: string) {
    if (model !== 'All') {
      this.allModels = this.defaultModels.filter(item => item.modelName === model);
    } else {
      this.allModels = this.defaultModels;
    }
  }

  ngOnDestroy(): void{
    this.sub$.unsubscribe();
  }
}
