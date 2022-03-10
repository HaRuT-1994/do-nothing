import {InjectionToken} from '@angular/core';

interface AppConfig {
    endPoints: any;
    routes: any;
    baseUrl: string;
}

export const AppConfig: AppConfig = {
    endPoints: {
        addCohort: 'ConfigCohorts/AddConfigCohorts',
        updateCohort: 'ConfigCohorts/UpdateConfigCohorts',
        getAllCohorts: 'ConfigCohorts/GetAllConfigCohorts',
        deleteCohort: 'ConfigCohorts/DeleteConfigCohorts',

        configCurve: 'ConfigCurves/AddConfigCurves',
        getAllCurves: 'ConfigCurves/GetAllConfigCurves',
        updateCurve: 'ConfigCurves/UpdateConfigCurves',
        deleteCurve: 'ConfigCurves/DeleteConfigCurves',

        configField: 'ConfigFields/AddConfigFields',
        getAllFields: 'ConfigFields/GetAllConfigFields',
        updateField: 'ConfigFields/UpdateConfigFields',
        deleteField: 'ConfigFields/DeleteConfigFields',

        configPoFBand: 'ConfigPoFBands/AddConfigPoFBands',
        getAllPoFBands: 'ConfigPoFBands/GetAllConfigPoFBands',
        updatePoFBand: 'ConfigPoFBands/UpdateConfigPoFBands',
        deletePoFBand: 'ConfigPoFBands/DeleteConfigPoFBands',

        configRiskLevel: 'ConfigRiskLevels/AddConfigRiskLevels',
        getAllRiskLevels: 'ConfigRiskLevels/GetAllConfigRiskLevels',
        updateRiskLevel: 'ConfigRiskLevels/UpdateConfigRiskLevels',
        deleteRiskLevel: 'ConfigRiskLevels/DeleteConfigRiskLevels',

        configScenario: 'ConfigScenarios/AddConfigScenarios',
        getAllScenarios: 'ConfigScenarios/GetAllConfigScenarios',
        updateScenario: 'ConfigScenarios/UpdateConfigScenarios',
        deleteScenario: 'ConfigScenarios/DeleteConfigScenarios',

        modelConfig: 'ModelConfiguration/AddModelConfiguration',
        getAllConfigs: 'ModelConfiguration/GetAllModelConfiguration',
        updateConfig: 'ModelConfiguration/UpdateModelConfiguration',
        deleteConfig: 'ModelConfiguration/DeleteModelConfiguration',

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
            configRiskLevels: "add-config-risk-levels",
            configCurves: "add-config-curves",
            pofBands: "add-config-pof-bands",
            configBudget: "add-config-budget"
        },
        edit: {
            doNothing: "edit-do-nothing",
            configCohort: "edit-config-cohort",
            configScenarios: "edit-config-scenarios",
            configFields: "edit-config-fields",
            configRiskLevels: "edit-config-risk-levels",
            configCurves: "edit-config-curves",
            pofBands: "edit-config-pof-bands",
        },
        view: {
            curvesTable: "curves-table",
            cohortTable: "cohort-table",
            scenariosTable: "scenarios-table",
            fieldsTable: "fields-table",
            riskLevelsTable: "risk-levels-table",
            pofBandsTable: "pof-bands-table",
            doNothingTable: "do-nothing-table"
        }
        
    },
    baseUrl: 'https://localhost:44360/'
};
