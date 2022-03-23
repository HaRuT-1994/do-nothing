export interface CurveModel {
    id?: number,
    scenarioId: number,
    scenarioName: string,
    cohortId: number,
    cohortName: string,
    calculation: string,
    poFCurve: number,
    poFNav: number,
    healthCurve: number,
    healthNav: number,
    poFConstant: number,
    healthConstant: number
}

