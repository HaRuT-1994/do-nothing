import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MsgDetails } from 'src/app/do-nothing/models/msgDetails.interface';
import { ConfigData } from 'src/app/models/configData.interface';

@Component({
  selector: 'app-export-model',
  templateUrl: './export-model.component.html',
  styleUrls: ['./export-model.component.scss']
})
export class ExportModelComponent implements OnInit {
  formGroup = new FormGroup({
    model: new FormControl(''),
    scenario: new FormControl('')
  })
  msgDetails: MsgDetails;
  isLoading: boolean;
  scenarioData: ConfigData[] = [];
  modelData: ConfigData[] = [];

  constructor( private dialogConfig: DynamicDialogConfig ) { }

  ngOnInit(): void {
    this.scenarioData = this.dialogConfig.data.scenarios;
    this.modelData = this.dialogConfig.data.models;
  }

  export(): void {
    console.log(this.formGroup.value, this.scenarioData);
  }
}
