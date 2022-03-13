import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { PoFBandsModel } from '../shared/models/pofBandData.interface';

@Injectable({
  providedIn: 'root'
})
export class PofBandsService {
  public editPofBand: PoFBandsModel[] = [];
  public isOnEdit: boolean;
  
  constructor(private http: HttpClient) { }

  addPofBands(data: any): Observable<any> {
    return this.http.post(`${AppConfig.baseUrl}api/${AppConfig.endPoints.addConfigPoFBand}`, data);
  }

  getAllPoFBands(): Observable<PoFBandsModel[]> {
    return this.http.get<PoFBandsModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllPoFBands}`);
  }
  
  deletePoFBand(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.baseUrl}api/${AppConfig.endPoints.deletePoFBand}/${id}`);
  }
   
  onEditPoFBand(data: PoFBandsModel): Observable<any> {
    data.id = this.editPofBand['id'];
    return this.http.put(`${AppConfig.baseUrl}api/${AppConfig.endPoints.updatePoFBand}`, data);
  }

  onEditRow(data): void {
    this.editPofBand = data;
    this.isOnEdit = true;
  }
}
