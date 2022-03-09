import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/do-nothing/enums/message.enum';
import { Severity } from 'src/app/do-nothing/enums/severity.enum';
import { ScenarioModel } from 'src/app/do-nothing/models/scenarioData.interface';
import { CommonService } from 'src/app/do-nothing/services/common.service';
import { ConfigScenariosService } from 'src/app/do-nothing/services/config-scenarios.service';

@Component({
  selector: 'app-scenarios-table',
  templateUrl: './scenarios-table.component.html',
  styleUrls: ['./scenarios-table.component.scss']
})
export class ScenariosTableComponent implements OnInit {
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allScenarios: ScenarioModel[] = [];
  public pageN: ScenarioModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private scenarioService: ConfigScenariosService,
               private router: Router,
               private commonService: CommonService) { }

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
    this.scenarioService.onEditRow(data);
    this.router.navigate([AppConfig.routes.edit.configScenarios]);
  }

  onDeleteRow(id: number): void {
    if(confirm('Are you sure in delating this config?')) {
      this.isLoading = true;
      this.scenarioService.deleteScenario(id).subscribe(
        () => {
          this.isLoading = false;
          this.allScenarios = this.allScenarios.filter( (val) => val['scenarioId'] !== id);
          this.onPageChange(this.currentPage);
          this.severity = Severity.SUCCESS;
          this.msg = Message.DELETE_SUCCESS_MSG;
          this.commonService.deleteMsg(this);
        },
        () => {
          this.isLoading = false;
          this.severity = Severity.ERROR;
          this.msg = Message.ERROR_MSG;
          this.commonService.deleteMsg(this); 
        }
      );
    }
  }

  onPageChange(ev): void {
    this.currentPage = ev;
    if(ev.page * ev.rows >= this.allScenarios.length) {
      ev.first -= 10;
    }

    this.pageN = this.allScenarios.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      
      this.pageN = this.allScenarios.filter(item => {
        for(let key in item) {
          if(key !== 'scenarioId' && item[key] !== null && item[key].toString().includes(search)) {
            return item;
          }
        }
      })
    } else {
      this.pageN = this.allScenarios;
      this.onPageChange({first: 0, rows: 10});
    }
  }
}