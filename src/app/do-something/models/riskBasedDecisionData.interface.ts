export interface RiskBasedDecisionModel {
  decisionId?: number,
  scenarioId: number,
  cohortId: number,
  poF: number,
  coF: number,
  risk: number,
  band: string,
  intervention: string,
  frequency: number
}