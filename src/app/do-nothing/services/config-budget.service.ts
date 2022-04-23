import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { BudgetModel } from '../models/budgetData.interface';

@Injectable()
export class ConfigBudgetService {
  public editBudget: BudgetModel[];
  public checkedData: number[] = [];

  constructor(private http: HttpClient) { }

  copyBudgets(): Observable<any> {
    if(this.checkedData.length) {
      return this.http.post<number[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.copyBudgets}`, this.checkedData);
    }
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
