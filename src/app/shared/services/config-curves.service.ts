import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { CurveModel } from '../models/curveData.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigCurvesService {
  public editCurves: CurveModel[] = [];
  public isOnEdit: boolean;

  constructor(private http: HttpClient) { }

  addConfigCurves(data: any): Observable<any> {
    return this.http.post(`${AppConfig.baseUrl}api/${AppConfig.endPoints.configCurve}`, data);
  }

  getAllCurves(): Observable<any> {
    return this.http.get<CurveModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllCurves}`);
  }
  
  deleteCurve(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deleteCurve}/${id}`);
  }
   
  onEditCurve(data: CurveModel): Observable<any> {
    data.id = this.editCurves['id'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updateCurve}`, data);
  }

  onEditRow(data): void {
    this.editCurves = data;
    this.isOnEdit = true;
  }
}
