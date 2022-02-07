import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pof-bands',
  templateUrl: './pof-bands.component.html',
  styleUrls: ['./pof-bands.component.scss']
})
export class PofBandsComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    scenarioId: new FormControl('', Validators.required),
    cohortId: new FormControl('', Validators.required),
    1: new FormControl('', Validators.required),
    2: new FormControl('', Validators.required),
    3: new FormControl('', Validators.required),
    4: new FormControl('', Validators.required),
    5: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formGroup.value)
  }

}
