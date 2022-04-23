import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { FieldModel } from '../models/fieldData.interface';

@Injectable()
export class ConfigFieldsService {
  public editFields: FieldModel[] = [];
  public checkedData: number[] = [];

  constructor(private http: HttpClient) { }

  copyFields(): Observable<any> {
    if(this.checkedData.length) {
      return this.http.post<number[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.copyFields}`, this.checkedData);
    }
  }

  addConfigFields(data: any): Observable<any> {
    return this.http.post(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigField}`, data);
  }

  getAllFields(): Observable<FieldModel[]> {
    return this.http.get<FieldModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllFields}`);
  }
  
  deleteField(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteField}/${id}`);
  }
   
  onEditField(data: FieldModel): Observable<any> {
    data.id = this.editFields['id'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateField}`, data);
  }

  onEditRow(data): void {
    this.editFields = data;
  }
}
