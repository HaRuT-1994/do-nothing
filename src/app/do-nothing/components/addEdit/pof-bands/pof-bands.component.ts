import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PofBandsService } from 'src/app/do-nothing/services/pof-bands.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LookupService } from 'src/app/do-nothing/services/lookup.service';
import { PoFBandsModel } from 'src/app/do-nothing/models/pofBandData.interface';

@Component({
  selector: 'app-pof-bands',
  templateUrl: './pof-bands.component.html',
  styleUrls: ['./pof-bands.component.scss']
})
export class PofBandsComponent {
  formGroup: FormGroup;
  msgDetails: MsgDetails;
  isOnEdit: boolean;
  isLoading: boolean;
  cohortData: ConfigData[];
  scenarioData: ConfigData[];
  private editPofBand: PoFBandsModel[];

  constructor(private pofBandsService: PofBandsService,
              private commonService: CommonService,
              private lookupService: LookupService,
              private dialogConfig: DynamicDialogConfig,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.formInit();
    this.cohortData = this.lookupService.configCohortData;
    this.scenarioData = this.lookupService.configScenariosData;
    this.isOnEdit = !this.dialogConfig.data?.add;

    if (this.isOnEdit) {
      this.editPofBand = this.pofBandsService.editPofBand;
      this.commonService.updateForm(this.formGroup, this.editPofBand);
    }
  }

  formInit(): void {
    this.formGroup = this.fb.group({
      scenario: [''],
      cohort: [''],
      _1: [0],
      _2: [0],
      _3: [0],
      _4: [0],
      _5: [0]
    });
  }

  addConfig(): void {
    this.isLoading = true;
    this.commonService.changeToObj(this.formGroup, this.scenarioData, this.cohortData);
    this.pofBandsService.addPofBands(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'PoF Bands Form ' +  Message.SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData()
        this.formInit();
      },
      err => {
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
        this.isLoading = false;
      }
    );
  }

  editConfig(): void {
    this.isLoading = true;
    this.commonService.changeToObj(this.formGroup, this.scenarioData, this.cohortData);
    this.pofBandsService.onEditPoFBand(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: 'PoF Bands Form ' +  Message.EDIT_SUCCESS_MSG, severity: Severity.SUCCESS};
        this.commonService.updateData();
        this.editPofBand = this.formGroup.value;
        this.commonService.updateForm(this.formGroup, this.editPofBand);
      },
      () => {
        this.isLoading = false;
        this.msgDetails = {msg: Message.ERROR_MSG, severity: Severity.ERROR};
      }
    );
  }
}