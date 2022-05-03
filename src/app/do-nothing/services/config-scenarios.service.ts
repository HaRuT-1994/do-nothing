import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { ConfigData } from '../../models/configData.interface';
import { ScenarioModel } from '../models/scenarioData.interface';

@Injectable()
export class ConfigScenariosService {
  public editScenario: ScenarioModel[] = [];
  public scenariosToRun: ConfigData[] = [];
  public checkedData: number[] = [];

  constructor(private http: HttpClient) { }

  copyScenarios(data: number[]): Observable<any> {
      return this.http.post<number[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.copyScenarios}`, data);
  }

  addConfigScenarios(data: any): Observable<ConfigData[]> {
    return this.http.post<ConfigData[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigScenario}`, data);
  }

  getAllScenarios(): Observable<ScenarioModel[]> {
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
  }
}
