import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { CohortModel } from '../models/cohortData.interface';
import { ConfigData } from '../models/configData.interface';

@Injectable({
  providedIn: 'root'
})
export class CohortService {
  editCohort: CohortModel[] = [];
  isOnEdit: boolean;
  constructor(private http: HttpClient) { }

  addCohort(data: any): Observable<any> {
    return this.http.post(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addCohort}`, data);
  }

  getConfigCohort(): Observable<any> {
    return this.http.get<ConfigData>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.lookupConfigCohorts}`);
  }

  getAllCohorts(): Observable<any> {
    return this.http.get<CohortModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllCohorts}`);
  }
  
  deleteCohort(id): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteCohort}/${id}`);
  }
   
  onEditCohort(data: any): Observable<any> {
    data.cohortId = this.editCohort['cohortId'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateCohort}`, data);
  }

  onEditRow(data) {
    this.editCohort = data;
    this.isOnEdit = true;    
  } 

}
