import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject } from 'rxjs';
import { ConfigData } from '../models/configData.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private ref: DynamicDialogRef;
  private siblingData = new Subject<any>();

  constructor(private dialogService: DialogService) { }

  public deleteMsg(context): void {
    setTimeout(() => {
       context.msgDetails.severity = '';
    }, 3000)
  }

  public getData(): Observable<any> {
    return this.siblingData.asObservable();
  }
 
  public updateData(data: any, isAdd?: boolean): void {
    this.siblingData.next([data, isAdd]);
  }

  public updateForm(formGroup, newData): void {
    return Object.keys(formGroup.controls).forEach( (controlName) => {
            if(controlName === 'cohort' || controlName === 'scenario') {
              formGroup.controls[controlName].patchValue(newData[controlName].value);
            }
            else {
              formGroup.controls[controlName].patchValue(newData[controlName]);
            }
    })
  }

  public show(component): void {
    this.ref = this.dialogService.open( component, {
        width: '80%',
        contentStyle: {"max-height": "800px", "overflow": "auto"},
        baseZIndex: 10000
    });

    this.ref.onClose.subscribe(() =>{
      // console.log(res);
      
      
    });
  }

  public changeToObj(data: FormGroup, scenarioData: ConfigData[], cohortData: ConfigData[]) {
    let scenario = scenarioData.filter(item => (
      item.id === data.controls['scenario'].value ||
      item.value === data.controls['scenario'].value))
    
    let cohort = cohortData.filter(item => (
      item.id === data.controls['cohort'].value ||
      item.value === data.controls['cohort'].value))
    
      data.patchValue({
      scenario: scenario[0],
      cohort: cohort[0]
    })
  }
}