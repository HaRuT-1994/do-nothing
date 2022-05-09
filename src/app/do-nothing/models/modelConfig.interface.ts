export interface ModelConfig {
  id?: number,
  check?: RunModelHistory,
  modelName: string,
  baseYear: number,
  yearsToRun: number,
  skipTheseLifecycle: string,
  skipTheseUnitClasses: string,
  dataModelOutputTemplate: string,
  runDate: Date,
  nrModelColumns: number,
  debugMode: boolean,
  scenariosToRun: string,
  scenarioName: string,
  allowOverwriteToExceedBudget: boolean,
  skipTheseAssetSources: string,
  conditionRange: string,
  allowSurplusBudgetRollover: boolean
}

export interface RunModelHistory {
  configurationId?: number,
  scenarioIds: number[]
}