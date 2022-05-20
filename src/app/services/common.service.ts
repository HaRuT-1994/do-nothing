import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subject } from 'rxjs';
import { ConfigData } from '../models/configData.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private siblingData = new Subject<any>();

  constructor(private dialogService: DialogService) { }

  public getData(): Observable<any> {
    return this.siblingData.asObservable();
  }
 
  public updateData(): void {
    this.siblingData.next();
  }

  public updateForm(formGroup, newData): void {
    return Object.keys(formGroup.controls).forEach( (controlName) => {
            if(controlName === 'cohort' || controlName === 'scenario' || controlName === 'ScenarioName') {
              formGroup.controls[controlName].patchValue(newData[controlName].value);
            }
            else {
              formGroup.controls[controlName].patchValue(newData[controlName]);
            }
    })
  }

  public show(component, data?): void {
    this.dialogService.open( component, {
        data: data,
        width: '80%',
        contentStyle: {"max-height": "800px", "overflow": "auto"},
        baseZIndex: 10000
    });
  }

  public changeToObj(form: FormGroup, scenarioData?: ConfigData[], cohortData?: ConfigData[]) {
    if(scenarioData) {
      const scenario = scenarioData.filter(item => (
          item.id === form.controls['scenario'].value ||
          item.value === form.controls['scenario'].value));
      
      form.patchValue({ scenario: scenario[0] });
    }
    
    if(cohortData) {
      const cohort = cohortData.filter(item => (
          item.id === form.controls['cohort'].value ||
          item.value === form.controls['cohort'].value));

      form.patchValue({ cohort: cohort[0] })
    }
  }
}