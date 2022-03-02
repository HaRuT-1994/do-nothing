import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CohortService } from 'src/app/services/cohort.service';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cohort',
  templateUrl: './cohort.component.html',
  styleUrls: ['./cohort.component.scss']
})
export class CohortComponent {
  public formGroup: FormGroup = new FormGroup({
    cohorts: new FormControl(''),
    description: new FormControl('')
  });

  public severity = '';
  public msg = '';
  public isOnEdit: boolean;
  
  constructor(private cohortService: CohortService, private commonService: CommonService,private route: ActivatedRoute) {
    console.log(this.route.snapshot.routeConfig.path.split('-')[0]);
    
  }

  addConfig() {
    this.cohortService.addCohort(this.formGroup.value).subscribe(
      () => {
        this.severity = Severity.SUCCESS;
        this.msg = 'Cohort Form ' +  Message.SUCCESS_MSG;
        this.commonService.deleteMsg(this);
      },
      err => { 
        console.log(err);
        this.severity = Severity.ERROR;
        this.msg = Message.ERROR_MSG;
        this.commonService.deleteMsg(this);
      }
    );
  }
}
