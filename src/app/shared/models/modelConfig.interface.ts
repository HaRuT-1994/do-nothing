export interface ModelConfig {
  id?: number,
  modelName: string,
  baseYear: number,
  yearsToRun: number,
  skipTheseLifecycle: string,
  skipTheseUnitClasses: string,
  dataModelOutputTemplate: string,
  nrModelColumns: number,
  debugMode: boolean,
  scenariosToRun: string,
  allowOverwriteToExceedBudget: boolean,
  skipTheseAssetSources: string,
  conditionRange: string
}