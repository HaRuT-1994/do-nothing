import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class PofBandsService {

  private appConfig = AppConfig;
  constructor(private http: HttpClient) { }

  addPofBands(data: any): Observable<any> {
    return this.http.post(`${this.appConfig.baseUrl}api/${this.appConfig.endPoints.ConfigPoFBands}`, data)
  }
}
