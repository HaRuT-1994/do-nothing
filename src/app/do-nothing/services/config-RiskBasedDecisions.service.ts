import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { RiskBasedDecisionModel } from '../models/riskBasedDecisionData.interface';

@Injectable()
export class ConfigRiskBasedDecisionsService {
  public editRiskBasedDecision: RiskBasedDecisionModel[] = [];
  public isOnEdit: boolean;
  
  constructor(private http: HttpClient) { }

  addConfigRiskBasedDecision(data: any): Observable<RiskBasedDecisionModel[]> {
    return this.http.post<RiskBasedDecisionModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigRiskBasedDecision}`, data);
  }

  getAllRiskBasedDecisions(): Observable<RiskBasedDecisionModel[]> {
    return this.http.get<RiskBasedDecisionModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllRiskBasedDecisions}`);
  }
  
  deleteRiskBasedDecision(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteRiskBasedDecision}/${id}`);
  }
   
  onEditRiskBasedDecision(data: RiskBasedDecisionModel): Observable<any> {
    data.decisionId = this.editRiskBasedDecision['decisionId'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateRiskBasedDecision}`, data);
  }

  onEditRow(data): void {
    this.editRiskBasedDecision = data;
    this.isOnEdit = true;    
  }
}
