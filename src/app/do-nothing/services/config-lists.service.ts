import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { ListsModel } from '../models/listsData.interface';

@Injectable()
export class ConfigListsService {
  public editLists: ListsModel[] = [];
  public isOnEdit: boolean;
  
  constructor(private http: HttpClient) { }

  addConfigList(data: any): Observable<ListsModel[]> {
    return this.http.post<ListsModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigLists}`, data);
  }

  getAllLists(): Observable<ListsModel[]> {
    return this.http.get<ListsModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllLists}`);
  }
  
  deleteCohort(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteList}/${id}`);
  }
   
  onEditCohort(data: ListsModel): Observable<any> {
    data.listId = this.editLists['listId'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateList}`, data);
  }

  onEditRow(data): void {
    this.editLists = data;
    this.isOnEdit = true;    
  }
}
