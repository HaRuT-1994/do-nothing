export interface CurveModel {
    id?: number,
    scenarioId: number,
    cohortId: number,
    calculation: string,
    poFCurve: number,
    poFNav: number,
    healthCurve: number,
    healthNav: number,
    poFConstant: number,
    healthConstant: number
}

