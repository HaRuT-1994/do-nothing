import { ConfigData } from "src/app/models/configData.interface";

export interface RatesModel {
  ratesId?: number,
  check?: boolean,
  scenario: ConfigData,
  cohort: ConfigData,
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