export interface ScenarioModel {
  scenarioId?: number,
  check?: boolean,
  scenario: string,
  validatedOption: boolean,
  restrictToBudget: boolean,
  run: boolean
}