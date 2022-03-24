export interface InterventionOptionsModel {
  interventionId?: number,
  scenarioId: number,
  scenarioName: string,
  cohortId: number,
  cohortName: string,
  intervention: string,
  available: boolean,
  reset: string,
  applyWhenMlc: number,
  excludeIfCrc: number,
  forceReplace: boolean,
  whenAlc: number,
  replaceWithCohortId: number
}