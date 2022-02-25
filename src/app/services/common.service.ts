import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  deleteMsg(context) {
    setTimeout(() => {
      context.severity = '';
    }, 2500)
  }
}
