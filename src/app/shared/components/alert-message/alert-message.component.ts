import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { MsgDetails } from "src/app/do-nothing/models/msgDetails.interface";

@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.component.html'
})
export class AlertMessageComponent implements OnChanges {
  @Input() msgDetails: MsgDetails = {severity: '', msg: ''};

  ngOnChanges() {
    if(this.msgDetails?.severity) {
      this.deleteMsg();
    }
  }

  private  deleteMsg(): void {
    setTimeout(() => {
       this.msgDetails.severity = '';
    }, 3000)
  }
}