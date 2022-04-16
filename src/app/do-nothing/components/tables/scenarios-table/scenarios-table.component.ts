import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ScenarioModel } from 'src/app/do-nothing/models/scenarioData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';
import { ConfirmationService } from 'primeng/api';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigScenariosComponent } from '../../addEdit/config-scenarios/config-scenarios.component';

@Component({
  selector: 'app-scenarios-table',
  templateUrl: './scenarios-table.component.html',
  styleUrls: ['./scenarios-table.component.scss']
})
export class ScenariosTableComponent implements OnInit {
  public createPath = AppConfig.routes.add.configScenarios;
  public isLoading: boolean;
  public msgDetails: MsgDetails;
  public allScenarios: ScenarioModel[] = [];
  public shownAllScenarios: ScenarioModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private scenarioService: ConfigScenariosService,
               private commonService: CommonService,
               private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.scenarioService.getAllScenarios().subscribe(
      (res: ScenarioModel[]) => {
        this.allScenarios = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  onEditRow(data: ScenarioModel): void {
    this.confirmationService.confirm({
      message: 'Edit config?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.scenarioService.onEditRow(data);
        this.commonService.show(ConfigScenariosComponent);
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
        this.scenarioService.deleteScenario(id).subscribe(
          () => {
            this.isLoading = false;
            this.allScenarios = this.allScenarios.filter( (val) => val['scenarioId'] !== id);
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

  onPageChange(ev): void {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allScenarios.length) {
      ev.first -= 10;
    }

    this.shownAllScenarios = this.allScenarios.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      
      this.shownAllScenarios = this.allScenarios.filter(item => {
        for(let key in item) {
          if(item[key] && key !== 'scenarioId'
          && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllScenarios = this.allScenarios;
      this.onPageChange(this.currentPage);
    }
  }
}