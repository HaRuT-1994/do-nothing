import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { ConfigData } from '../models/configData.interface';

@Injectable({
  providedIn: 'root'
})
export class CohortService {

  private appConfig = AppConfig;
  constructor(private http: HttpClient) { }

  addCohort(data: any): Observable<any> {
    return this.http.post(`${this.appConfig.baseUrl}api/${this.appConfig.endPoints.ConfigCohorts}`, data)
  }

  getConfigCohort(): Observable<any> {
    return this.http.get<ConfigData>(`${this.appConfig.baseUrl}api/${this.appConfig.endPoints.lookupConfigCohorts}`)
  }
}
