import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { BudgetPivotDetails } from '../models/budgetPivotDetails.interface';
import { BudgetYearsModel } from '../models/budgetYearsData.interface';

@Injectable()
export class ConfigBudgetYearService {
  public editBudgetYears: BudgetYearsModel[];

  constructor(private http: HttpClient) { }

  addConfigBudgetYear(data: any): Observable<BudgetYearsModel[]> {
    return this.http.post<BudgetYearsModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigBudgetYear}`, data);
  }

  getAllBudgetYears(): Observable<BudgetPivotDetails[]> {
    return this.http.get<BudgetPivotDetails[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.budgetPivotDetails}`);
  }
  
  deleteBudgetYear(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteBudgetYear}/${id}`);
  }
   
  onEditBudgetYear(data: BudgetYearsModel): Observable<any> {
    data.budgetId = this.editBudgetYears['budgetId'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateBudgetYear}`, data);
  }

  onEditRow(data): void {
    this.editBudgetYears = data;
  }
}
