export interface BudgetModel {
  budgetId?: number,
  scenarioId: number,
  scenarioName: string,
  expLimit: number,
  year: number,
  budget: number,
  budgetSource: string
}