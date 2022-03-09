import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { ConfigData } from '../models/configData.interface';
import { ScenarioModel } from '../models/scenarioData.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigScenariosService {
  public editScenario: ScenarioModel[] = [];
  public isOnEdit: boolean;

  constructor(private http: HttpClient) { }

  addConfigScenarios(data: any): Observable<any> {
    return this.http.post(`${AppConfig.baseUrl}api/${AppConfig.endPoints.configScenario}`, data);
  }

  getConfigScenarios(): Observable<any> {
    return this.http.get<ConfigData>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.lookupConfigScenarios}`)
  }

  getAllScenarios(): Observable<any> {
    return this.http.get<ScenarioModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllScenarios}`);
  }
  
  deleteScenario(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteScenario}/${id}`);
  }
   
  onEditScenario(data: ScenarioModel): Observable<any> {
    data.scenarioId = this.editScenario['scenarioId'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateScenario}`, data);
  }

  onEditRow(data): void {
    this.editScenario = data;
    this.isOnEdit = true;
  }
}
