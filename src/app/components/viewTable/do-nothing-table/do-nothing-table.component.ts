import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { ModelConfig } from 'src/app/models/modelConfig.interface';
import { CommonService } from 'src/app/services/common.service';
import { DoNothingService } from 'src/app/services/do-nothing.service';

@Component({
  selector: 'app-do-nothing-table',
  templateUrl: './do-nothing-table.component.html',
  styleUrls: ['./do-nothing-table.component.scss']
})
export class DoNothingTableComponent implements OnInit {
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allModels: ModelConfig[] = [];
  public pageN: ModelConfig[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private doNothingService: DoNothingService,
               private commonService: CommonService,
               private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true
    this.doNothingService.getAllModelConfigs().subscribe(
      (res: ModelConfig[]) => {
        this.allModels = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  onEditRow(data: ModelConfig): void {
    this.doNothingService.onEditRow(data);
    this.router.navigate([AppConfig.routes.edit.doNothing]);
  }

  onDeleteRow(id: number): void {
    if(confirm('Are you sure in delating this config?')) {
      this.isLoading = true;
      
      this.doNothingService.deleteModelConfig(id).subscribe(
        () => {
          this.isLoading = false;
          this.allModels = this.allModels.filter( (val) => val['id'] !== id);
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

  onPageChange(ev) {
    this.currentPage = ev;
    if(!(this.allModels.length % 10) && (ev.first % 10 !== 0)) {
      ev.first -= 10; 
    }
    this.pageN = this.allModels;
    this.pageN = this.pageN.slice(ev.first, ev.first + ev.rows);
  }
}
