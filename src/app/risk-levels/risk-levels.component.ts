import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-risk-levels',
  templateUrl: './risk-levels.component.html',
  styleUrls: ['./risk-levels.component.scss']
})
export class RiskLevelsComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    pof: new FormControl('', Validators.required),
    cof: new FormControl('', Validators.required),
    riskScore: new FormControl('', Validators.required),
    riskRating: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formGroup.value)
  }

}
