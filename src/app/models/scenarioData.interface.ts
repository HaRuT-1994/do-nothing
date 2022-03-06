export interface ScenarioModel {
  scenarioId?: number,
  scenario: string,
  validatedOption: boolean,
  restrictToBudget: boolean,
  run: boolean
}