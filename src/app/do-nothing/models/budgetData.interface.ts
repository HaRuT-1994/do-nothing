import { ConfigData } from "src/app/models/configData.interface"

export interface BudgetModel {
  budgetId?: number,
  check?: boolean,
  scenario: ConfigData,
  exceedanceAllowance: number,
  budgetName: string,
  budgetSource: string
}