import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RiskLevelsService } from 'src/app/do-nothing/services/risk-levels.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-risk-levels',
  templateUrl: './risk-levels.component.html',
  styleUrls: ['./risk-levels.component.scss']
})
export class RiskLevelsComponent implements OnInit {
  public formGroup: FormGroup;
  public severity: string;
  public msg: string;
  public isOnEdit: boolean;
  public isLoading: boolean;

  constructor( private riskLvlService: RiskLevelsService,
               private commonService: CommonService,
               private location: Location) { }

  ngOnInit(): void {
    this.formInit();
    this.isOnEdit = this.riskLvlService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }
    if (this.isOnEdit) {
      this.commonService.updateForm(this.formGroup, this.riskLvlService.editRiskLvl);
    }
  }

  formInit(): void {
    this.formGroup = new FormGroup({
      pof: new FormControl(''),
      cof: new FormControl(''),
      riskScore: new FormControl(''),
      riskRating: new FormControl(''),
    });
  }

  addConfig(): void {
    this.isLoading = true;
    this.riskLvlService.addRiskLevels(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Risk Levels Form ' + Message.SUCCESS_MSG;
        this.commonService.deleteMsg(this);
        this.formGroup.reset();
        this.formInit();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.severity = Severity.ERROR;
        this.msg = Message.ERROR_MSG;
        this.commonService.deleteMsg(this);
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.riskLvlService.onEditRiskLevel(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Risk Level Form ' +  Message.EDIT_SUCCESS_MSG;
        this.commonService.deleteMsg(this);
      },
      () => {
        this.isLoading = false;4
        
        this.severity = Severity.ERROR;
        this.msg = Message.ERROR_MSG;
        this.commonService.deleteMsg(this);
      }
    );
  }

  goBack(): void {
    this.location.back();
    this.isOnEdit = false;
  }
}