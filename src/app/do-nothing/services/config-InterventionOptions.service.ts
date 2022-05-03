import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { InterventionOptionsModel } from '../models/interventionOptionsData.interface';

@Injectable()
export class ConfigInterventionOptionsService {
  public editInterventionOptions: InterventionOptionsModel[] = [];
  
  constructor(private http: HttpClient) { }

  copyIntOptions(data: number[]): Observable<any> {
    return this.http.post<number[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.copyInterventionOptions}`, data);
  }

  addConfigInterventionOptions(data: any): Observable<InterventionOptionsModel[]> {
    return this.http.post<InterventionOptionsModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigInterventionOptions}`, data);
  }

  getAllInterventionOptions(): Observable<InterventionOptionsModel[]> {
    return this.http.get<InterventionOptionsModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllInterventionOptions}`);
  }
  
  deleteInterventionOption(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteInterventionOption}/${id}`);
  }
   
  onEditInterventionOption(data: InterventionOptionsModel): Observable<any> {
    data.interventionId = this.editInterventionOptions['interventionId'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateInterventionOption}`, data);
  }

  onEditRow(data): void {
    this.editInterventionOptions = data;
  }
}
