import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { ListValuesModel } from '../models/listValuesData.interface';

@Injectable()
export class ConfigListValuesService {
  public editListValues: ListValuesModel[] = [];
  
  constructor(private http: HttpClient) { }

  addConfigListValue(data: any): Observable<ListValuesModel[]> {
    return this.http.post<ListValuesModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigListValues}`, data);
  }

  getAllListValues(): Observable<ListValuesModel[]> {
    return this.http.get<ListValuesModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllListValues}`);
  }
  
  deleteListValues(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteListValue}/${id}`);
  }
   
  onEditListValues(data: ListValuesModel): Observable<any> {
    data.itemId = this.editListValues['itemId'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateListValue}`, data);
  }

  onEditRow(data): void {
    this.editListValues = data;
  }
}
