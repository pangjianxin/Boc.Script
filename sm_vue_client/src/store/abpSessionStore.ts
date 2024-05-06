import { defineStore } from "pinia";
import {
  VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationConfigurationDto,
  VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationConfigurationDto,
  VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationAuthConfigurationDto,
  VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationSettingConfigurationDto,
  VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentUserDto,
  VoloAbpAspNetCoreMvcMultiTenancyCurrentTenantDto,
  VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationGlobalFeatureConfigurationDto,
  VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationFeatureConfigurationDto,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
export const useAbpSessionStore = defineStore(
  "abp-sesion",
  () => {
    const state =
      reactive<VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationConfigurationDto>(
        {
          localization: undefined,
          auth: undefined,
          setting: undefined,
          currentUser: undefined,
          features: undefined,
          globalFeatures: undefined,
          multiTenancy: undefined,
          currentTenant: undefined,
          timing: undefined,
          clock: undefined,
        }
      );

    const isPermitted = (permissionName: string) => {
      return state.auth?.grantedPolicies![permissionName] !== undefined;
    };

    const localization = computed<
      | VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationConfigurationDto
      | undefined
    >(() => state.localization);

    const globalFeatures =
      computed<VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationGlobalFeatureConfigurationDto>(
        () => state.globalFeatures!
      );

    const features =
      computed<VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationFeatureConfigurationDto>(
        () => state.features!
      );

    const auth = computed<
      | VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationAuthConfigurationDto
      | undefined
    >(() => state.auth);

    const setting = computed<
      | VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationSettingConfigurationDto
      | undefined
    >(() => state.setting);

    const currentUser = computed<
      VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentUserDto | undefined
    >(() => state.currentUser);

    const isAuthenticated = computed<boolean | undefined>(
      () => state.currentUser?.isAuthenticated
    );

    const currentTenant = computed<
      VoloAbpAspNetCoreMvcMultiTenancyCurrentTenantDto | undefined
    >(() => state.currentTenant);

    const fetchSession = async () => {
      const systemClient = new SystemClient(OpenAPI);
      const config =
        await systemClient.abpApplicationConfiguration.abpApplicationConfigurationGet(
          { includeLocalizationResources: false }
        );
      if (config) {
        state.localization = config.localization;
        state.auth = config.auth;
        state.setting = config.setting;
        state.currentUser = config.currentUser;
        state.currentTenant = config.currentTenant;
        state.features = config.features;
        state.globalFeatures = config.globalFeatures;
      }
    };

    const clearState = () => {
      state.localization = {};
      state.auth = {};
      state.setting = {};
      state.currentUser = undefined;
      state.currentTenant = undefined;
      state.features = {};
      state.globalFeatures = {};
    };

    return {
      state,
      features,
      globalFeatures,
      localization,
      auth,
      setting,
      currentTenant,
      currentUser,
      isAuthenticated,
      isPermitted,
      clearState,
      fetchSession,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: [
        "state.localization",
        "state.features",
        "state.globalFeatures",
        "state.auth",
        "state.setting",
        "state.currentUser",
        "state.currentTenant",
      ],
      key: "abp-session",
    },
  }
);
