import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigBudgetService } from 'src/app/do-something/services/config-budget.service';
import { Message } from 'src/app/enums/message.enum';
import { Severity } from 'src/app/enums/severity.enum';
import { CommonService } from 'src/app/services/common.service';
import { ConfigData } from 'src/app/models/configData.interface';
import { ConfigScenariosService } from 'src/app/services/config-scenarios.service';

@Component({
  selector: 'app-config-budget',
  templateUrl: './config-budget.component.html',
  styleUrls: ['./config-budget.component.scss']
})
export class ConfigBudgetComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({
    scenarioId: new FormControl(0),
    expLimit: new FormControl(0),
    year: new FormControl(0),
    budget: new FormControl(0)
  });
  public scenarioData: ConfigData[] = [];
  public severity: string;
  public msg: string;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor( 
               private budgetService: ConfigBudgetService,
               private commonService: CommonService,
               private scenariosService: ConfigScenariosService,
               private location: Location) { }

  ngOnInit(): void {

    this.scenariosService.getConfigScenarios().subscribe(
      (res: ConfigData[]) => {
        this.scenarioData = res;
      }
    )

    this.isOnEdit = this.budgetService.isOnEdit;
    if(this.location.path().includes('add')) {
      this.isOnEdit = false;
    }
    if (this.isOnEdit) {
      //this.commonService.updateForm(this.formGroup, this.budgetService.editCohort);
    }
  }

  addConfig(): void {
    this.isLoading = true;
    this.budgetService.addConfigBudget(this.formGroup.value).subscribe(
      () => {
        this.isLoading = false;
        this.severity = Severity.SUCCESS;
        this.msg = 'Config Budget Form ' +  Message.SUCCESS_MSG;
        this.commonService.deleteMsg(this);
        this.formGroup.reset();
      },
      () => {
        this.isLoading = false;
        this.severity = Severity.ERROR;
        this.msg = Message.ERROR_MSG;
        this.commonService.deleteMsg(this);
      }
    );
  }

  // editConfig(): void {
  //   this.isLoading = true;
  //   this.cohortService.onEditCohort(this.formGroup.value).subscribe(
  //     () => {
  //       this.isLoading = false;
  //       this.severity = Severity.SUCCESS;
  //       this.msg = 'Cohort Form ' +  Message.EDIT_SUCCESS_MSG;
  //       this.commonService.deleteMsg(this);
  //     },
  //     () => {
  //       this.isLoading = false;
  //       this.severity = Severity.ERROR;
  //       this.msg = Message.ERROR_MSG;
  //       this.commonService.deleteMsg(this);
  //     }
  //   );
  // }

  // goBack(): void {
  //   this.location.back();
  //   this.isOnEdit = false;
  // }
}
