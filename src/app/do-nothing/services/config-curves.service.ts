import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { CurveModel } from '../models/curveData.interface';

@Injectable()
export class ConfigCurvesService {
  public editCurves: CurveModel[] = [];
  public checkedData: number[] = [];

  constructor(private http: HttpClient) { }

  copyCurves(): Observable<any> {
    if(this.checkedData.length) {
      return this.http.post<number[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.copyCurves}`, this.checkedData);
    }
  }

  addConfigCurves(data: any): Observable<any> {
    return this.http.post(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigCurve}`, data);
  }

  getAllCurves(): Observable<CurveModel[]> {
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
  }
}
