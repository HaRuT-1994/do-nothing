import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { InterventionOptionsModel } from 'src/app/do-something/models/interventionOptionsData.interface';
import { ConfigInterventionOptionsService } from 'src/app/do-something/services/config-InterventionOptions.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-intervention-options-table',
  templateUrl: './intervention-options-table.component.html',
  styleUrls: ['./intervention-options-table.component.scss']
})
export class InterventionOptionsTableComponent implements OnInit {
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allInterventionOptions: InterventionOptionsModel[] = [];
  public shownAllInterventionOptions: InterventionOptionsModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private interventionOptionsService: ConfigInterventionOptionsService,
               private router: Router,
               private commonService: CommonService) { }

   ngOnInit(): void {
    this.isLoading = true
    this.interventionOptionsService.getAllInterventionOptions().subscribe(
      (res: InterventionOptionsModel[]) => {
        this.allInterventionOptions = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
   }

  onEditRow(data: InterventionOptionsModel): void {
    this.interventionOptionsService.onEditRow(data);
    this.router.navigate([AppConfig.routes.edit.configInterventionOptions]);
  }

  onDeleteRow(id: number): void {
    if(confirm('Are you sure in delating this config?')) {
      this.isLoading = true;
      this.interventionOptionsService.deleteInterventionOption(id).subscribe(
        () => {
          this.isLoading = false;
          this.allInterventionOptions = this.allInterventionOptions.filter( (val) => val['interventionId'] !== id);
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
    if(ev.page * ev.rows >= this.allInterventionOptions.length) {
      ev.first -= 10;
    }

    this.shownAllInterventionOptions = this.allInterventionOptions.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.shownAllInterventionOptions = this.allInterventionOptions.filter(item => {
        for(let key in item) {
          if(item[key] && key !== 'interventionId' && item[key].toString().toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        }
      })
    } else {
      this.shownAllInterventionOptions = this.allInterventionOptions;
      this.onPageChange(this.currentPage);
    }
  }
}
