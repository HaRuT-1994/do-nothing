interface AppConfig {
    endPoints: any;
    routes: any;
    baseUrl: string;
}

export const AppConfig: AppConfig = {
    endPoints: {
        addConfigCohort: 'ConfigCohorts/AddConfigCohorts',
        updateCohort: 'ConfigCohorts/UpdateConfigCohorts',
        getAllCohorts: 'ConfigCohorts/GetAllConfigCohorts',
        deleteCohort: 'ConfigCohorts/DeleteConfigCohorts',
        copyCohorts: 'ConfigCohorts/CopyConfigCohorts',

        addConfigCurve: 'ConfigCurves/AddConfigCurves',
        getAllCurves: 'ConfigCurves/GetAllConfigCurves',
        updateCurve: 'ConfigCurves/UpdateConfigCurves',
        deleteCurve: 'ConfigCurves/DeleteConfigCurves',
        copyCurves: 'ConfigCurves/CopyConfigCurves',

        addConfigField: 'ConfigFields/AddConfigFields',
        getAllFields: 'ConfigFields/GetAllConfigFields',
        updateField: 'ConfigFields/UpdateConfigFields',
        deleteField: 'ConfigFields/DeleteConfigFields',
        copyFields: 'ConfigFields/CopyConfigFields',

        addConfigPoFBand: 'ConfigPoFBands/AddConfigPoFBands',
        getAllPoFBands: 'ConfigPoFBands/GetAllConfigPoFBands',
        updatePoFBand: 'ConfigPoFBands/UpdateConfigPoFBands',
        deletePoFBand: 'ConfigPoFBands/DeleteConfigPoFBands',
        copyPoFBands: 'ConfigPoFBands/CopyConfigPoFBands',

        addConfigRiskLevel: 'ConfigRiskLevels/AddConfigRiskLevels',
        getAllRiskLevels: 'ConfigRiskLevels/GetAllConfigRiskLevels',
        updateRiskLevel: 'ConfigRiskLevels/UpdateConfigRiskLevels',
        deleteRiskLevel: 'ConfigRiskLevels/DeleteConfigRiskLevels',
        copyRiskLevels: 'ConfigRiskLevels/CopyConfigRiskLevels',

        addConfigScenario: 'ConfigScenarios/AddConfigScenarios',
        getAllScenarios: 'ConfigScenarios/GetAllConfigScenarios',
        updateScenario: 'ConfigScenarios/UpdateConfigScenarios',
        deleteScenario: 'ConfigScenarios/DeleteConfigScenarios',
        copyScenarios: 'ConfigScenarios/CopyConfigScenarios',

        addModelConfig: 'ModelConfiguration/AddModelConfiguration',
        getAllConfigs: 'ModelConfiguration/GetAllModelConfiguration',
        updateConfig: 'ModelConfiguration/UpdateModelConfiguration',
        deleteConfig: 'ModelConfiguration/DeleteModelConfiguration',
        runModels: 'RunHistory/AddModelConfigurationRunHistory',
        copyModels: 'ModelConfiguration/CopyModelConfiguration',

        addConfigBudget: 'ConfigBudget/AddConfigBudget',
        getAllBudgets: 'ConfigBudget/GetAllConfigBudget',
        updateBudget: 'ConfigBudget/UpdateConfigBudget',
        deleteBudget: 'ConfigBudget/DeleteConfigBudget',
        copyBudgets: 'ConfigBudget/CopyConfigBudget',

        addConfigBudgetYear: 'ConfigBudgetYear/AddConfigBudgetYear',
        getAllBudgetYears: 'ConfigBudgetYear/GetAllConfigBudgetYear',
        updateBudgetYear: 'ConfigBudgetYear/UpdateConfigBudgetYear',
        deleteBudgetYear: 'ConfigBudgetYear/DeleteConfigBudgetYear',
        copyBudgetYears: 'ConfigBudgetYear/CopyConfigBudgetYear',

        addConfigInterventionOptions: 'ConfigInterventionOptions/AddConfigInterventionOptions',
        getAllInterventionOptions: 'ConfigInterventionOptions/GetAllConfigInterventionOptions',
        updateInterventionOption: 'ConfigInterventionOptions/UpdateConfigInterventionOptions',
        deleteInterventionOption: 'ConfigInterventionOptions/DeleteConfigInterventionOptions',
        copyInterventionOptions: 'ConfigInterventionOptions/CopyConfigInterventionOptions',

        addConfigRates: 'ConfigRates/AddConfigRates',
        getAllRates: 'ConfigRates/GetAllConfigRates',
        updateRate: 'ConfigRates/UpdateConfigRates',
        deleteRate: 'ConfigRates/DeleteConfigRates',
        copyRates: 'ConfigRates/CopyConfigRates',

        addConfigRiskBasedDecision: 'ConfigRiskBasedDecisions/AddConfigRiskBasedDecisions',
        getAllRiskBasedDecisions: 'ConfigRiskBasedDecisions/GetAllConfigRiskBasedDecisions',
        updateRiskBasedDecision: 'ConfigRiskBasedDecisions/UpdateConfigRiskBasedDecisions',
        deleteRiskBasedDecision: 'ConfigRiskBasedDecisions/DeleteConfigRiskBasedDecisions',
        copyRiskBasedDecisions: 'ConfigRiskBasedDecisions/CopyConfigRiskBasedDecisions',
        
        addConfigLists: 'ConfigLists/AddConfigLists',
        getAllLists: 'ConfigLists/GetAllConfigLists',
        updateList: 'ConfigLists/UpdateConfigLists',
        deleteList: 'ConfigLists/DeleteConfigLists',
        copyLists: 'ConfigLists/CopyConfigLists',

        addConfigListValues: 'ConfigListValues/AddConfigListValues',
        getAllListValues: 'ConfigListValues/GetAllConfigListValues',
        updateListValue: 'ConfigListValues/UpdateConfigListValues',
        deleteListValue: 'ConfigListValues/DeleteConfigListValues',
        copyListValues: 'ConfigListValues/CopyConfigListValues',
        getListValuesByListId: 'ConfigListValues/GetConfigListValuesByListId',

        getAllRunHistory: 'RunHistory/GetAllRunHistory',

        lookupSkipTheseLifecycles: 'Lookup/LookupSkipTheseLifecycles',
        lookupSkipTheseAssetSources: 'Lookup/LookupSkipTheseAssetSources',
        lookupSkipTheseUnitClasses: 'Lookup/LookupSkipTheseUnitClasses',
        lookupConfigScenarios: 'Lookup/LookupConfigScenarios',
        lookupConfigCohorts : 'Lookup/LookupConfigCohorts',

        budgetPivotDetails: 'BudgetDetails/GetAllConfigBudgetPivotDetails',
    },
    routes: {
        projects: {
            plans: "Projects/Plans",
        },
        data_model: "Data-Model",
        add: {
            doNothing: "add-config-model",
            cohort: "add-config-cohort",
            configScenarios: "add-config-scenarios",
            configFields: "add-config-fields",
            configRiskLevels: "add-config-riskLevels",
            configCurves: "add-config-curves",
            pofBands: "add-config-pof-bands",
            configBudget: "add-config-budget",
            configBudgetYear: "add-config-budget-year",
            configInterventionOptions: "add-config-interventionOptions",
            configRates: "add-config-rates",
            configRiskBasedDecision: "add-config-riskBasedDecision",
            configLists: "add-config-lists",
            configListValues: "add-config-listValues",
        },
        edit: {
            doNothing: "edit-config-model",
            configCohort: "edit-config-cohort",
            configScenarios: "edit-config-scenarios",
            configFields: "edit-config-fields",
            configRiskLevels: "edit-config-risk-levels",
            configCurves: "edit-config-curves",
            pofBands: "edit-config-pof-bands",
            configBudget: "edit-config-budget",
            configBudgetYear: "edit-config-budget-year",
            configInterventionOptions: "edit-config-interventionOptions",
            configRates: "edit-config-rates",
            configRiskBasedDecision: "edit-config-riskBasedDecision",
            configLists: "edit-config-lists",
            configListValues: "edit-config-listValues"
        },
        view: {
            curvesTable: "curves-table",
            cohortTable: "cohort-table",
            scenariosTable: "scenarios-table",
            fieldsTable: "fields-table",
            riskLevelsTable: "risk-levels-table",
            pofBandsTable: "pof-bands-table",
            doNothingTable: "model-table",
            listsTable: "lists-table",
            listValuesTable: "list-values-table",
            ratesTable: "rates-table",
            budgetTable: "budget-table",
            budgetYearsTable: "budget-years-table",
            interventionOptionsTable: "intervention-options-table",
            riskBasedDecisionTable: "risk-based-decision-table",
            runHistory: "run-history-table",
        }
        
    },
    baseUrl: 'https://localhost:44360/'
};
