import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { RatesModel } from '../models/ratesData.interface';

@Injectable()
export class ConfigRatesService {
  public editRates: RatesModel[] = [];
  public checkedData: number[] = [];
  
  constructor(private http: HttpClient) { }

  copyRates(data: number[]): Observable<any> {
    return this.http.post<number[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.copyRates}`, data);
  }

   deleteRates(data: number[]): Observable<any> {
    const options = {
      headers: new HttpHeaders({'content-type': 'application/json'}),
      body: data
    }
  
    return this.http.delete<any>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteMultiRates}`, options);
  }

  addConfigRates(data: any): Observable<RatesModel[]> {
    return this.http.post<RatesModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigRates}`, data);
  }

  getAllRates(): Observable<RatesModel[]> {
    return this.http.get<RatesModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllRates}`);
  }
  
  deleteRate(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteRate}/${id}`);
  }
   
  onEditRate(data: RatesModel): Observable<any> {
    data.ratesId = this.editRates['ratesId'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateRate}`, data);
  }

  onEditRow(data): void {
    this.editRates = data;
  }
}
