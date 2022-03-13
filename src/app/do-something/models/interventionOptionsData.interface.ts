export interface InterventionOptionsModel {
  interventionId?: number,
  scenarioId: number,
  cohortId: number,
  intervention: string,
  available: boolean,
  reset: string,
  applyWhenMlc: number,
  excludeIfCrc: number,
  forceReplace: boolean,
  whenAlc: number,
  replaceWithCohortId: number
}