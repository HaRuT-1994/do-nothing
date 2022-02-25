import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class RiskLevelsService {

  private appConfig = AppConfig;
  constructor(private http: HttpClient) { }

  addRiskLevels(data: any): Observable<any> {
    return this.http.post(`${this.appConfig.baseUrl}api/${this.appConfig.endPoints.ConfigRiskLevels}`, data)
  }
}
