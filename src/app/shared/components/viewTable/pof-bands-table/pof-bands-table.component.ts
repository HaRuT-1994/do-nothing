import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { PoFBandsModel } from 'src/app/shared/models/pofBandData.interface';
import { CommonService } from 'src/app/services/common.service';
import { PofBandsService } from 'src/app/services/pof-bands.service';

@Component({
  selector: 'app-pof-bands-table',
  templateUrl: './pof-bands-table.component.html',
  styleUrls: ['./pof-bands-table.component.scss']
})
export class PoFBandsTableComponent implements OnInit {
  public isLoading: boolean;
  public severity: string;
  public msg: string;
  public allPoFBands: PoFBandsModel[] = [];
  public sohwnAllPoFBands: PoFBandsModel[] = [];
  private currentPage = {first: 0, rows: 10};

  constructor( private pofBandService: PofBandsService,
               private router: Router,
               private commonService: CommonService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.pofBandService.getAllPoFBands().subscribe(
      (res: PoFBandsModel[]) => {
        this.allPoFBands = res;
        this.onPageChange(this.currentPage);
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  onEditRow(data: PoFBandsModel): void {
    this.pofBandService.onEditRow(data);
    this.router.navigate([AppConfig.routes.edit.pofBands]);
  }

  onDeleteRow(id: number): void {
    if(confirm('Are you sure in delating this config?')) {
      this.isLoading = true;
      this.pofBandService.deletePoFBand(id).subscribe(
        () => {
          this.isLoading = false;
          this.allPoFBands = this.allPoFBands.filter( (val) => val['id'] !== id);
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
    if(ev.page * ev.rows >= this.allPoFBands.length) {
      ev.first -= 10;
    }

    this.sohwnAllPoFBands = this.allPoFBands.slice(ev.first, ev.first + ev.rows);
  }

  filterData(search: string): void {
    if (search.length) {
      this.sohwnAllPoFBands = this.allPoFBands.filter(item => {
        for(let key in item) {
          if(key !== 'id' && key !== 'scenarioId' && key !== 'cohortId' && item[key] !== null && item[key].toString().includes(search)) {
            return item;
          }
        }
      })
    } else {
      this.sohwnAllPoFBands = this.allPoFBands;
      this.onPageChange({first: 0, rows: 10});
    }
  }
}
