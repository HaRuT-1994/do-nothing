import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { ModelConfig } from '../shared/models/modelConfig.interface';

@Injectable({
  providedIn: 'root'
})
export class DoNothingService {
  public editModel: ModelConfig[] = [];
  public isOnEdit: boolean;
  
  constructor(private http: HttpClient) { }

  addDoNothing(data: any): Observable<any> {
    return this.http.post(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addModelConfig}`, data);
  }

  getSkipTheseLifecycles(): Observable<any> {
    return this.http.get(`${AppConfig.baseUrl}api/${AppConfig.endPoints.lookupSkipTheseLifecycles}`);
  }

  getSkipTheseAssetSources(): Observable<any> {
    return this.http.get(`${AppConfig.baseUrl}api/${AppConfig.endPoints.lookupSkipTheseAssetSources}`);
  }

  getSkipTheseUnitClasses(): Observable<any> {
    return this.http.get(`${AppConfig.baseUrl}api/${AppConfig.endPoints.lookupSkipTheseUnitClasses}`);
  }

  getAllModelConfigs(): Observable<ModelConfig[]> {
    return this.http.get<ModelConfig[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllConfigs}`);
  }
  
  deleteModelConfig(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteConfig}/${id}`);
  }
   
  onEditModelConfig(data: ModelConfig): Observable<any> {
    data.id = this.editModel['id'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateConfig}`, data);
  }

  onEditRow(data): void {
    this.editModel = data;
    this.isOnEdit = true;    
  }
}
