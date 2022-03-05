import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<div class="lds-dual-ring"></div>',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
