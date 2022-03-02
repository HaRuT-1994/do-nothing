import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RiskLevelsService } from 'src/app/services/risk-levels.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-risk-levels',
  templateUrl: './risk-levels.component.html',
  styleUrls: ['./risk-levels.component.scss']
})
export class RiskLevelsComponent {
  public formGroup: FormGroup = new FormGroup({
    pof: new FormControl(''),
    cof: new FormControl(''),
    riskScore: new FormControl(''),
    riskRating: new FormControl(''),
  });

  public severity = '';
  public msg = '';

  constructor(private riskLvlService: RiskLevelsService, private commonService: CommonService) { }

  onSubmit() {
    this.riskLvlService.addRiskLevels(this.formGroup.value).subscribe(
      () => {
        this.severity = Severity.SUCCESS;
        this.msg = 'Risk Levels Form ' + Message.SUCCESS_MSG;
        this.commonService.deleteMsg(this);
      },
      err => { 
        console.log(err);
        this.severity = Severity.ERROR;
        this.msg = Message.ERROR_MSG;
        this.commonService.deleteMsg(this);
      }
    );
  }
}