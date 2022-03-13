export interface RatesModel {
  ratesId?: number,
  scenarioId: number,
  cohortId: string,
  intervention: string,
  geography: string,
  budgetSource: string,
  value: number,
  rateType: string,
  minimumCost: number,
  rangeType: string,
  from1: number,
  value1: number,
  from2: number,
  value2: number
}