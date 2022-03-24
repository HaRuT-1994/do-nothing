export interface RunHistoryModel {
  id?: number,
  runDate: Date,
  configurationId: number,
  scenarioId: number,
  scenarioName: string,
  rowsRan: number,
  status: string,
  comments: string,
  runStart: Date,
  runEnd: Date
}