/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationResourceDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationResourceDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentCultureDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentCultureDto';
import type { VoloAbpLocalizationLanguageInfo } from './VoloAbpLocalizationLanguageInfo';
import type { VoloAbpNameValue } from './VoloAbpNameValue';
export type VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationConfigurationDto = {
    values?: Record<string, Record<string, string>> | null;
    resources?: Record<string, VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationResourceDto> | null;
    languages?: Array<VoloAbpLocalizationLanguageInfo> | null;
    currentCulture?: VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentCultureDto;
    defaultResourceName?: string | null;
    languagesMap?: Record<string, Array<VoloAbpNameValue>> | null;
    languageFilesMap?: Record<string, Array<VoloAbpNameValue>> | null;
};

