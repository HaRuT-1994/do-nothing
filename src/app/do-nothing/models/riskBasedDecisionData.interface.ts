import { ConfigData } from "src/app/models/configData.interface";

export interface RiskBasedDecisionModel {
  decisionId?: number,
  scenario: ConfigData,
  cohort: ConfigData,
  poF: number,
  coF: number,
  risk: number,
  band: string,
  intervention: string,
  frequency: number
}