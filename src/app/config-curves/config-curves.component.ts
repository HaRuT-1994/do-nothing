import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config-curves',
  templateUrl: './config-curves.component.html',
  styleUrls: ['./config-curves.component.scss']
})
export class ConfigCurvesComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    scenarioId: new FormControl('', Validators.required),
    cohortId: new FormControl('', Validators.required),
    calculation: new FormControl('', Validators.required),
    pofCurve: new FormControl('', Validators.required),
    pofNav: new FormControl('', Validators.required),
    healthCurve: new FormControl('', Validators.required),
    healthNav: new FormControl('', Validators.required),
    pofConstant: new FormControl('', Validators.required),
    healthConstant: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formGroup.value)
  }
}
