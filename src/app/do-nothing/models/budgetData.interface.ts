import { ConfigData } from "src/app/models/configData.interface"

export interface BudgetModel {
  budgetId?: number,
  scenario: ConfigData,
  exceedanceAllowance: number,
  budgetName: string,
  budgetSource: string
}