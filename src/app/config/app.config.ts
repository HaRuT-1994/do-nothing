import {InjectionToken} from '@angular/core';

interface AppConfig {
    endPoints: any;
    routes: any;
    baseUrl: string;
}

export const AppConfig: AppConfig = {
    endPoints: {
        ConfigCohorts: 'ConfigCohorts/AddConfigCohorts',
        ConfigCurves: 'ConfigCurves/AddConfigCurves',
        ConfigFields: 'ConfigFields/AddConfigFields',
        ConfigPoFBands: 'ConfigPoFBands/AddConfigPoFBands',
        ConfigRiskLevels: 'ConfigRiskLevels/AddConfigRiskLevels',
        ConfigScenarios: 'ConfigScenarios/AddConfigScenarios',
        ModelConfiguration: 'ModelConfiguration/AddModelConfiguration',
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
        },
        edit: {
            doNothing: "edit-do-nothing",
            cohort: "edit-config-cohort",
            configScenarios: "edit-config-scenarios",
            configFields: "edit-config-fields",
            configRiskLevels: "edit-config-risk-levels",
            configCurves: "edit-config-curves",
            pofBands: "edit-config-pof-bands",
        },
        view: {
            curvesTable: "curves-table",
            cohortTable: "cohort-table"
        }
        
    },
    baseUrl: 'https://localhost:44360/'
};
