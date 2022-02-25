import {InjectionToken} from '@angular/core';

interface AppConfig {
    endPoints: any;
    routes: any;
    baseUrl: string;
}

export let APP_CONFIG = new InjectionToken('app.config');

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
        doNothing: "do-nothing",
        cohort: "config-cohort",
        configScenarios: "config-scenarios",
        configFields: "config-fields",
        configRiskLevels: "config-risk-levels",
        configCurves: "config-curves",
        pofBands: "config-pof-bands"
    },
    baseUrl: 'https://localhost:44360/'
};
