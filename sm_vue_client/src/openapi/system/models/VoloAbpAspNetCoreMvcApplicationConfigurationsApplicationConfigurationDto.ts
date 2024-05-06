/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationAuthConfigurationDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationAuthConfigurationDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationFeatureConfigurationDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationFeatureConfigurationDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationGlobalFeatureConfigurationDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationGlobalFeatureConfigurationDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationConfigurationDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationConfigurationDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationSettingConfigurationDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationSettingConfigurationDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsClockDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsClockDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentUserDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentUserDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingObjectExtensionsDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingObjectExtensionsDto';
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsTimingDto } from './VoloAbpAspNetCoreMvcApplicationConfigurationsTimingDto';
import type { VoloAbpAspNetCoreMvcMultiTenancyCurrentTenantDto } from './VoloAbpAspNetCoreMvcMultiTenancyCurrentTenantDto';
import type { VoloAbpAspNetCoreMvcMultiTenancyMultiTenancyInfoDto } from './VoloAbpAspNetCoreMvcMultiTenancyMultiTenancyInfoDto';
export type VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationConfigurationDto = {
    localization?: VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationConfigurationDto;
    auth?: VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationAuthConfigurationDto;
    setting?: VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationSettingConfigurationDto;
    currentUser?: VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentUserDto;
    features?: VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationFeatureConfigurationDto;
    globalFeatures?: VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationGlobalFeatureConfigurationDto;
    multiTenancy?: VoloAbpAspNetCoreMvcMultiTenancyMultiTenancyInfoDto;
    currentTenant?: VoloAbpAspNetCoreMvcMultiTenancyCurrentTenantDto;
    timing?: VoloAbpAspNetCoreMvcApplicationConfigurationsTimingDto;
    clock?: VoloAbpAspNetCoreMvcApplicationConfigurationsClockDto;
    objectExtensions?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingObjectExtensionsDto;
    extraProperties?: Record<string, any> | null;
};

