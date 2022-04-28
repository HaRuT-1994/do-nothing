import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { AppConfig } from "src/app/config/app.config";
import { ConfigData } from "src/app/models/configData.interface";

@Injectable()
export class LookupService {
  public skipTheseLifecycles: ConfigData[];
  public skipTheseAssetSources: ConfigData[] = [];
  public skipTheseUnitClasses: ConfigData[] = [];
  public configCohortData: ConfigData[] = [];
  public configScenariosData: ConfigData[] = [];

  constructor(private http: HttpClient) {
    this.getSkipTheseAssetSources();
    this.getSkipTheseLifecycles();
    this.getSkipTheseUnitClasses();
    this.getConfigCohort();
    this.getConfigScenarios();
  }

  private getSkipTheseLifecycles(): void {
    this.http.get(`${AppConfig.baseUrl}api/${AppConfig.endPoints.lookupSkipTheseLifecycles}`).subscribe(
      (res: ConfigData[]) => this.skipTheseLifecycles = res
    );
  }

  private getSkipTheseAssetSources(): void {
    this.http.get(`${AppConfig.baseUrl}api/${AppConfig.endPoints.lookupSkipTheseAssetSources}`).subscribe(
      (res: ConfigData[]) => this.skipTheseAssetSources = res
    );
  }

  private getSkipTheseUnitClasses(): void {
    this.http.get(`${AppConfig.baseUrl}api/${AppConfig.endPoints.lookupSkipTheseUnitClasses}`).subscribe(
      (res: ConfigData[]) => this.skipTheseUnitClasses = res
    );
  }

  private getConfigCohort(): void {
    this.http.get<ConfigData[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.lookupConfigCohorts}`).subscribe(
      (res: ConfigData[]) => this.configCohortData = res
    );
  }

  private getConfigScenarios(): void{
    this.http.get<ConfigData[]>(`${AppConfig.baseUrl}api/${AppConfig.endPoints.lookupConfigScenarios}`).subscribe(
      (res: ConfigData[]) => this.configScenariosData = res
    );
  }
}