export interface RunHistoryModel {
  id?: number,
  runDate: Date,
  configurationId: number,
  scenarioId: number,
  rowsRan: number,
  status: string,
  comments: string
}