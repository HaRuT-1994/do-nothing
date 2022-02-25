import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class DoNothingService {

  private appConfig = AppConfig;
  constructor(private http: HttpClient) { }

  addDoNothing(data: any): Observable<any> {
    return this.http.post(`${this.appConfig.baseUrl}api/${this.appConfig.endPoints.ModelConfiguration}`, data);
  }

  getSkipTheseLifecycles(): Observable<any> {
    return this.http.get(`${this.appConfig.baseUrl}api/${this.appConfig.endPoints.lookupSkipTheseLifecycles}`);
  }

  getSkipTheseAssetSources(): Observable<any> {
    return this.http.get(`${this.appConfig.baseUrl}api/${this.appConfig.endPoints.lookupSkipTheseAssetSources}`);
  }

  getSkipTheseUnitClasses(): Observable<any> {
    return this.http.get(`${this.appConfig.baseUrl}api/${this.appConfig.endPoints.lookupSkipTheseUnitClasses}`);
  }
}
