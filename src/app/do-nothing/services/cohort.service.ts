import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { CohortModel } from '../models/cohortData.interface';
import { ConfigData } from '../../models/configData.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class CohortService {
  public editCohort: CohortModel[] = [];
  public checkedData: number[] = [];
  
  constructor(private http: HttpClient) { }

  copyCohorts(): Observable<any> {
    if(this.checkedData.length) {
      return this.http.post<number[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.copyCohorts}`, this.checkedData);
    }
  }

  addCohort(data: any): Observable<ConfigData[]> {
    return this.http.post<ConfigData[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigCohort}`, data);
  }
  
  getAllCohorts(): Observable<any> {
    return this.http.get<CohortModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllCohorts}`);
  }
  
  deleteCohort(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteCohort}/${id}`);
  }
   
  onEditCohort(data: CohortModel): Observable<any> {
    data.cohortId = this.editCohort['cohortId'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateCohort}`, data);
  }

  onEditRow(data): void {
    this.editCohort = data;
  }
}
