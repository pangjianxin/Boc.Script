/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyApiDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyApiDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyAttributeDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyAttributeDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingLocalizableStringDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingLocalizableStringDto';
export type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyDto = {
    type?: string | null;
    typeSimple?: string | null;
    displayName?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingLocalizableStringDto;
    api?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyApiDto;
    ui?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiDto;
    attributes?: Array<VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyAttributeDto> | null;
    configuration?: Record<string, any> | null;
    defaultValue?: any;
};

