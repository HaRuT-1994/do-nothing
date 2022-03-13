import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { RunHistoryModel } from '../models/runHistoryData.interface';

@Injectable({ providedIn: 'root' })
export class RunHistoryService {
  
  constructor(private http: HttpClient) { }

  getAllRiskBasedDecisions(): Observable<RunHistoryModel[]> {
    return this.http.get<RunHistoryModel[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.getAllRunHistory}`);
  }
}
