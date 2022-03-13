import {InjectionToken} from '@angular/core';

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

        addConfigCurve: 'ConfigCurves/AddConfigCurves',
        getAllCurves: 'ConfigCurves/GetAllConfigCurves',
        updateCurve: 'ConfigCurves/UpdateConfigCurves',
        deleteCurve: 'ConfigCurves/DeleteConfigCurves',

        addConfigField: 'ConfigFields/AddConfigFields',
        getAllFields: 'ConfigFields/GetAllConfigFields',
        updateField: 'ConfigFields/UpdateConfigFields',
        deleteField: 'ConfigFields/DeleteConfigFields',

        addConfigPoFBand: 'ConfigPoFBands/AddConfigPoFBands',
        getAllPoFBands: 'ConfigPoFBands/GetAllConfigPoFBands',
        updatePoFBand: 'ConfigPoFBands/UpdateConfigPoFBands',
        deletePoFBand: 'ConfigPoFBands/DeleteConfigPoFBands',

        addConfigRiskLevel: 'ConfigRiskLevels/AddConfigRiskLevels',
        getAllRiskLevels: 'ConfigRiskLevels/GetAllConfigRiskLevels',
        updateRiskLevel: 'ConfigRiskLevels/UpdateConfigRiskLevels',
        deleteRiskLevel: 'ConfigRiskLevels/DeleteConfigRiskLevels',

        addConfigScenario: 'ConfigScenarios/AddConfigScenarios',
        getAllScenarios: 'ConfigScenarios/GetAllConfigScenarios',
        updateScenario: 'ConfigScenarios/UpdateConfigScenarios',
        deleteScenario: 'ConfigScenarios/DeleteConfigScenarios',

        addModelConfig: 'ModelConfiguration/AddModelConfiguration',
        getAllConfigs: 'ModelConfiguration/GetAllModelConfiguration',
        updateConfig: 'ModelConfiguration/UpdateModelConfiguration',
        deleteConfig: 'ModelConfiguration/DeleteModelConfiguration',

        addConfigBudget: 'ConfigBudget/AddConfigBudget',
        getAllBudgets: 'ConfigBudget/GetAllConfigBudget',
        updateBudget: 'ConfigBudget/UpdateConfigBudget',
        deleteBudget: 'ConfigBudget/DeleteConfigBudget',

        addConfigInterventionOptions: 'ConfigInterventionOptions/AddConfigInterventionOptions',
        getAllInterventionOptions: 'ConfigInterventionOptions/GetAllConfigInterventionOptions',
        updateInterventionOption: 'ConfigInterventionOptions/UpdateConfigInterventionOptions',
        deleteInterventionOption: 'ConfigInterventionOptions/DeleteConfigInterventionOptions',

        addConfigRates: 'ConfigRates/AddConfigRates',
        getAllRates: 'ConfigRates/GetAllConfigRates',
        updateRate: 'ConfigRates/UpdateConfigRates',
        deleteRate: 'ConfigRates/DeleteConfigRates',

        addConfigRiskBasedDecision: 'ConfigRiskBasedDecisions/AddConfigRiskBasedDecisions',
        getAllRiskBasedDecisions: 'ConfigRiskBasedDecisions/GetAllConfigRiskBasedDecisions',
        updateRiskBasedDecision: 'ConfigRiskBasedDecisions/UpdateConfigRiskBasedDecisions',
        deleteRiskBasedDecision: 'ConfigRiskBasedDecisions/DeleteConfigRiskBasedDecisions',
        
        addConfigLists: 'ConfigLists/AddConfigLists',
        getAllLists: 'ConfigLists/GetAllConfigLists',
        updateList: 'ConfigLists/UpdateConfigLists',
        deleteList: 'ConfigLists/DeleteConfigLists',

        addConfigListValues: 'ConfigListValues/AddConfigListValues',
        getAllListValues: 'ConfigListValues/GetAllConfigListValues',
        updateListValue: 'ConfigListValues/UpdateConfigListValues',
        deleteListValue: 'ConfigListValues/DeleteConfigListValues',

        getAllRunHistory: 'RunHistory/GetAllRunHistory',

        lookupSkipTheseLifecycles: 'Lookup/LookupSkipTheseLifecycles',
        lookupSkipTheseAssetSources: 'Lookup/LookupSkipTheseAssetSources',
        lookupSkipTheseUnitClasses: 'Lookup/LookupSkipTheseUnitClasses',
        lookupConfigScenarios: 'Lookup/LookupConfigScenarios',
        lookupConfigCohorts : 'Lookup/LookupConfigCohorts'
    },
    routes: {
        add: {
            doNothing: "add-do-nothing",
            cohort: "add-config-cohort",
            configScenarios: "add-config-scenarios",
            configFields: "add-config-fields",
            configRiskLevels: "add-config-riskLevels",
            configCurves: "add-config-curves",
            pofBands: "add-config-pof-bands",
            configBudget: "add-config-budget",
            configInterventionOptions: "add-config-interventionOptions",
            configRates: "add-config-rates",
            configRiskBasedDecision: "add-config-riskBasedDecision",
            configLists: "add-config-lists",
            configListValues: "add-config-listValues",
        },
        edit: {
            doNothing: "edit-do-nothing",
            configCohort: "edit-config-cohort",
            configScenarios: "edit-config-scenarios",
            configFields: "edit-config-fields",
            configRiskLevels: "edit-config-risk-levels",
            configCurves: "edit-config-curves",
            pofBands: "edit-config-pof-bands",
            configBudget: "edit-config-budget",
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
            doNothingTable: "do-nothing-table",
            listsTable: "lists-table",
            listValuesTable: "list-values-table",
            ratesTable: "rates-table",
            budgetTable: "budget-table",
            interventionOptionsTable: "intervention-options-table",
            riskBasedDecisionTable: "risk-based-decision-table",
            runHistory: "run-history-table"
        }
        
    },
    baseUrl: 'https://localhost:44360/'
};
