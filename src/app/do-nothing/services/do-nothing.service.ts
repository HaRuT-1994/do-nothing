import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfigData } from 'src/app/models/configData.interface';
import { AppConfig } from '../../config/app.config';
import { ModelConfig, RunModelHistory } from '../models/modelConfig.interface';

@Injectable()
export class DoNothingService {
  public editModel: ModelConfig[] = [];
  public skipTheseLifecycles: ConfigData[] = [];
  public skipTheseAssetSources: ConfigData[] = [];
  public skipTheseUnitClasses: ConfigData[] = [];
  
  constructor(private http: HttpClient) { }
 
  runModel(data: RunModelHistory[]): Observable<any> {
      return this.http.post<RunModelHistory[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.runModels}`, data);
  }

  copyModel(data): Observable<any> {  
    return this.http.post<number[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.copyModels}`, data);
  }

  deleteModels(data: number[]): Observable<any> {
    const options = {
      headers: new HttpHeaders({'content-type': 'application/json'}),
      body: data
    }
  
    return this.http.delete<any>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteMultiModels}`, options);
  }

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

  strToArray(data: string): number[] {
    let arr = [];
    data.split(',').forEach(i => !isNaN(+i) && arr.push(+i));
    return arr;
  }

  arrToString(data: string[], form: FormGroup) {
    data.forEach(i => {
     form.value[i] = form.value[i] && form.value[i].filter(i => i).toString();
    });
  }
}
