import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigData } from 'src/app/models/configData.interface';
import { AppConfig } from '../../config/app.config';
import { ModelConfig } from '../models/modelConfig.interface';

@Injectable()
export class DoNothingService {
  public editModel: ModelConfig[] = [];
  public skipTheseLifecycles: ConfigData[] = [];
  public skipTheseAssetSources: ConfigData[] = [];
  public skipTheseUnitClasses: ConfigData[] = [];
  
  constructor(private http: HttpClient) { }

  addDoNothing(data: any): Observable<any> {
    return this.http.post(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addModelConfig}`, data);
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
  }
}
