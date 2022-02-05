import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-do-nothing',
  templateUrl: './do-nothing.component.html',
  styleUrls: ['./do-nothing.component.scss']
})
export class DoNothingComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    modelName: new FormControl('WTP', Validators.required),
    baseYear: new FormControl(2021, Validators.required),
    yearsToRun: new FormControl(20, Validators.required),
    lifecycles: new FormControl('', Validators.required),
    sources: new FormControl('', Validators.required),
    classes: new FormControl('', Validators.required),
    run: new FormControl('', Validators.required),
    range: new FormControl('', Validators.required),
    nrColumns: new FormControl('', Validators.required),
    unitCompSeparated: new FormControl(true),
    firstPostOpt: new FormControl(true),
    debugMode: new FormControl(true),
    allowOverwriteBudget: new FormControl(true)
  });
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formGroup)
  }

}
