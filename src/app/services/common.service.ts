import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  deleteMsg(context): void {
    setTimeout(() => {
      context.severity = '';
    }, 2500)
  }

  updateForm(formGroup, newData) {
    return Object.keys(formGroup.controls).forEach( (controlName) => {
          formGroup.controls[controlName].patchValue(newData[controlName]);
    })
  }
}
