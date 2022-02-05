import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config-scenarios',
  templateUrl: './config-scenarios.component.html',
  styleUrls: ['./config-scenarios.component.scss']
})
export class ConfigScenariosComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    scenarioName: new FormControl('', Validators.required),
    validatedOption: new FormControl(true),
    restrictToBudget: new FormControl(true),
    run: new FormControl(true)
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formGroup)
  }

}
