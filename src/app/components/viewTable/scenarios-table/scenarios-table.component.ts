import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ScenarioModel } from 'src/app/models/scenarioData.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigScenariosService } from 'src/app/services/config-scenarios.service';

@Component({
  selector: 'app-scenarios-table',
  templateUrl: './scenarios-table.component.html',
  styleUrls: ['./scenarios-table.component.scss']
})
export class ScenariosTableComponent implements OnInit {
  public allScenarios: ScenarioModel[] = [];
  public isLoading: boolean;
  public severity: string;
  public msg: string;

  constructor( private scenarioService: ConfigScenariosService,
               private router: Router,
               private commonService: CommonService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.scenarioService.getAllScenarios().subscribe(
      (res: ScenarioModel[]) => {
        this.allScenarios = res;
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

}
