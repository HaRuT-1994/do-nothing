import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ScenarioModel } from 'src/app/do-nothing/models/scenarioData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigScenariosComponent } from '../../addEdit/config-scenarios/config-scenarios.component';
import { Subscription } from 'rxjs';
import { CheckedDataModel } from 'src/app/do-nothing/models/checkedData.interface';

@Component({
  selector: 'app-scenarios-table',
  templateUrl: './scenarios-table.component.html',
  styleUrls: ['./scenarios-table.component.scss']
})
export class ScenariosTableComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  msgDetails: MsgDetails;
  allScenarios: ScenarioModel[] = [];
  unCheckAll: boolean;
  private index = 0;
  private sub$: Subscription;
  private checkedData: CheckedDataModel[] = [];

  constructor( private scenarioService: ConfigScenariosService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllScenarios();

    this.sub$ = this.commonService.getData().subscribe(res => {
      if(typeof res === 'boolean') {
        this.getAllScenarios();
      } else {
        this.allScenarios[this.index] = res.value;
      }
    })
  }

  onEditRow(data: ScenarioModel, idx: number): void {
    this.index = idx;
    this.scenarioService.onEditRow(data);
    this.commonService.show(ConfigScenariosComponent);
  }

  onDeleteRow(id: number): void {
    this.confirmationService.confirm({
      message: 'Delete config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.scenarioService.deleteScenario(id).subscribe(
          () => {
            this.isLoading = false;
            this.allScenarios = this.allScenarios.filter( (val) => val['scenarioId'] !== id);
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

  copyScenarios(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: Message.WARNING_COPY, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => this.unCheckAll = undefined );
      const configIds = this.checkedData.sort((a, b) => ( a.index - b.index )).map(el => el.checkedId);

      this.scenarioService.copyScenarios(configIds).subscribe(
        res => {
          this.getAllScenarios();
          this.unCheckAll = false;
          this.checkedData = [];
          this.msgDetails = {msg: 'Copy Scenarios ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  deleteScenarios(): void {
    if(!this.checkedData.length) {
      this.msgDetails = {msg: Message.WARNING_DELETE, severity: Severity.WARNING};
    } else {
      this.isLoading = true;
      setTimeout(() => this.unCheckAll = undefined );
      const configIds = this.checkedData.map(el => el.checkedId);

      this.scenarioService.deleteScenarios(configIds).subscribe(
        res => {
          this.getAllScenarios();
          this.unCheckAll = false;
          this.checkedData = [];
          this.msgDetails = {msg:  Message.DELETE_SUCCESS_MSG, severity: Severity.SUCCESS};
        },
        err => {
          this.isLoading = false;
          this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        }
      )
    }
  }

  onChecked(item: ScenarioModel, ev, idx: number): void{
    if(ev.target.checked) {
      this.checkedData.push({checkedId: item.scenarioId, index: idx});
    } else {
      this.checkedData = this.checkedData.filter(el => el.checkedId !== item.scenarioId);
    }
  }

  private getAllScenarios(): void {
    this.isLoading = true
    this.scenarioService.getAllScenarios().subscribe(
      (res: ScenarioModel[]) => {
        this.allScenarios = res;
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