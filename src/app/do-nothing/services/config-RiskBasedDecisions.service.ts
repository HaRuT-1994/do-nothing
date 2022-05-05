import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { RiskBasedDecisionModel } from '../models/riskBasedDecisionData.interface';

@Injectable()
export class ConfigRiskBasedDecisionsService {
  public editRiskBasedDecision: RiskBasedDecisionModel[] = [];
  
  constructor(private http: HttpClient) { }

  copyRiskBasedDecisions(data: number[]): Observable<any> {
    return this.http.post<number[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.copyRiskBasedDecisions}`, data);
  }

   deleteRiskBasedDecisions(data: number[]): Observable<any> {
    const options = {
      headers: new HttpHeaders({'content-type': 'application/json'}),
      body: data
    }
  
    return this.http.delete<any>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteMultiRiskBasedDecisions}`, options);
  }

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
  }
}
