import { ConfigData } from "src/app/models/configData.interface";

export interface CurveModel {
    id?: number,
    scenario: ConfigData,
    cohort: ConfigData,
    calculation: string,
    poFCurve: number,
    poFNav: number,
    healthCurve: number,
    healthNav: number,
    poFConstant: number,
    healthConstant: number
}

