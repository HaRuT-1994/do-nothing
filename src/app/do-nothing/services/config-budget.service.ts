import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { BudgetModel } from '../models/budgetData.interface';

@Injectable()
export class ConfigBudgetService {
  public editBudget: BudgetModel[];

  constructor(private http: HttpClient) { }

  copyBudgets(data: number[]): Observable<any> {
    return this.http.post<number[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.copyBudgets}`, data);
  }

  deleteBudgets(data: number[]): Observable<any> {
    const options = {
      headers: new HttpHeaders({'content-type': 'application/json'}),
      body: data
    }
  
    return this.http.delete<any>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteMultiBudgets}`, options);
  }

  addConfigBudget(data: any): Observable<BudgetModel[]> {
    return this.http.post<BudgetModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigBudget}`, data);
  }

  getAllBudgets(): Observable<BudgetModel[]> {
    return this.http.get<BudgetModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllBudgets}`);
  }
  
  deleteBudget(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteBudget}/${id}`);
  }
   
  onEditBudget(data: BudgetModel): Observable<any> {
    data.budgetId = this.editBudget['budgetId'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateBudget}`, data);
  }

  onEditRow(data): void {
    this.editBudget = data;
  }
}
