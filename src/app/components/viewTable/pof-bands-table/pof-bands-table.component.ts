import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { PoFBandsModel } from 'src/app/models/pofBandData.interface';
import { CommonService } from 'src/app/services/common.service';
import { PofBandsService } from 'src/app/services/pof-bands.service';

@Component({
  selector: 'app-pof-bands-table',
  templateUrl: './pof-bands-table.component.html',
  styleUrls: ['./pof-bands-table.component.scss']
})
export class PoFBandsTableComponent implements OnInit {
  public allPoFBands: PoFBandsModel[] = [];
  public isLoading: boolean;
  public severity: string;
  public msg: string;

  constructor( private pofBandService: PofBandsService,
               private router: Router,
               private commonService: CommonService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.pofBandService.getAllPoFBands().subscribe(
      (res: PoFBandsModel[]) => {
        this.allPoFBands = res;
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
