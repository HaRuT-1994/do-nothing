import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ConfigCurvesService {
  editCurves = [];
  isOnEdit: boolean;
  constructor(private http: HttpClient) { }

  addConfigCurves(data: any): Observable<any> {
    return this.http.post(`${AppConfig.baseUrl}api/${AppConfig.endPoints.ConfigCurves}`, data)
  }

  onEditRow(ev) {
    this.editCurves = ev;
    this.isOnEdit = true;
    //edit row api
  }
}
