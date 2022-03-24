export interface RiskBasedDecisionModel {
  decisionId?: number,
  scenarioId: number,
  scenarioName: string,
  cohortId: number,
  cohortName: string,
  poF: number,
  coF: number,
  risk: number,
  band: string,
  intervention: string,
  frequency: number
}