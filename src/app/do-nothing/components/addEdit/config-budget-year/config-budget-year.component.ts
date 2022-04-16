import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';

@Component({
  selector: 'app-config-budget-year',
  templateUrl: './config-budget-year.component.html',
  styleUrls: ['./config-budget-year.component.scss']
})
export class ConfigBudgetYearComponent implements OnInit {
  public formGroup: FormGroup;
  //public scenarioData: ConfigData[] = [];
  public msgDetails: MsgDetails;
  public isOnEdit: boolean;
  public isLoading: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
