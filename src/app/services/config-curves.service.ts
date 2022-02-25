import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ConfigCurvesService {

  private appConfig = AppConfig;
  constructor(private http: HttpClient) { }

  addConfigCurves(data: any): Observable<any> {
    return this.http.post(`${this.appConfig.baseUrl}api/${this.appConfig.endPoints.ConfigCurves}`, data)
  }
}
