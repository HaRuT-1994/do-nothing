import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { RiskLevelsModel } from '../models/riskLevelData.interface';

@Injectable({
  providedIn: 'root'
})
export class RiskLevelsService {
  public editRiskLvl: RiskLevelsModel[] = [];
  public isOnEdit: boolean;
  
  constructor(private http: HttpClient) { }

  addRiskLevels(data: any): Observable<any> {
    return this.http.post(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigRiskLevel}`, data);
  }

  getAllRiskLevels(): Observable<RiskLevelsModel[]> {
    return this.http.get<RiskLevelsModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllRiskLevels}`);
  }
  
  deleteRiskLevel(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteRiskLevel}/${id}`);
  }
   
  onEditRiskLevel(data: RiskLevelsModel): Observable<any> {
    data.id = this.editRiskLvl['id'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateRiskLevel}`, data);
  }

  onEditRow(data): void {
    this.editRiskLvl = data;
    this.isOnEdit = true;
  }
}
