import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config-fields',
  templateUrl: './config-fields.component.html',
  styleUrls: ['./config-fields.component.scss']
})
export class ConfigFieldsComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    tab: new FormControl('', Validators.required),
    internalFieldRef: new FormControl('', Validators.required),
    fieldNameInSheet: new FormControl('', Validators.required),
    column: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formGroup.value)
  }

}
