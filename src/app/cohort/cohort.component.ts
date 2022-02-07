import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cohort',
  templateUrl: './cohort.component.html',
  styleUrls: ['./cohort.component.scss']
})
export class CohortComponent {
  formGroup: FormGroup = new FormGroup({
    cohorts: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  onSubmit() {
    console.log(this.formGroup.value)
  }
}
