import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RiskLevelsService } from 'src/app/do-nothing/services/risk-levels.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RiskLevelsModel } from 'src/app/do-nothing/models/riskLevelData.interface';

@Component({
  selector: 'app-risk-levels',
  templateUrl: './risk-levels.component.html',
  styleUrls: ['./risk-levels.component.scss']
})
export class RiskLevelsComponent implements OnInit {
  formGroup: FormGroup;
  msgDetails: MsgDetails;
  isOnEdit: boolean;
  isLoading: boolean;
  private editRiskLvl: RiskLevelsModel[];

  constructor( private riskLvlService: RiskLevelsService,
               private commonService: CommonService,
               private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.formInit();
    this.isOnEdit = !this.dialogConfig.data?.add;

    if (this.isOnEdit) {
      this.editRiskLvl = this.riskLvlService.editRiskLvl;
      this.commonService.updateForm(this.formGroup, this.editRiskLvl);
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
        this.msgDetails = {msg: 'Risk Levels Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.formInit();
        this.commonService.updateData();
      },
      err => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.riskLvlService.onEditRiskLevel(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'Risk Level Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData();
        this.editRiskLvl = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editRiskLvl);
      },
      () => {
        this.isLoading = false;4
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }
}