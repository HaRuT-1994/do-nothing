import { ConfigData } from "src/app/models/configData.interface";

export interface InterventionOptionsModel {
  interventionId?: number,
  check?: boolean,
  scenario: ConfigData,
  cohort: ConfigData,
  intervention: string,
  available: boolean,
  reset: string,
  applyWhenMlc: number,
  excludeIfCrc: number,
  forceReplace: boolean,
  whenAlc: number,
  replaceWithCohortId: number
}