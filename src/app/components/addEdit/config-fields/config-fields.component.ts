import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Severity } from 'src/app/enums/severity.enum';
import { Message } from 'src/app/enums/message.enum';
import { ConfigFieldsService } from 'src/app/services/config-fields.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-config-fields',
  templateUrl: './config-fields.component.html',
  styleUrls: ['./config-fields.component.scss']
})
export class ConfigFieldsComponent {
  public formGroup: FormGroup = new FormGroup({
    tab: new FormControl(''),
    internalFieldReference: new FormControl(''),
    fieldNameInSheet: new FormControl(''),
    column: new FormControl(''),
    mandatoryForModel: new FormControl(true)
  });

  public severity = '';
  public msg = '';

  constructor(private configFieldsService: ConfigFieldsService, private commonService: CommonService) { }

  onSubmit() {
    this.configFieldsService.addConfigFields(this.formGroup.value).subscribe(
      () => {
        this.severity = Severity.SUCCESS;
        this.msg = 'Fields Form ' + Message.SUCCESS_MSG;
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
