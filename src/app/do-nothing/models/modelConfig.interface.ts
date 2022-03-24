export interface ModelConfig {
  id?: number,
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