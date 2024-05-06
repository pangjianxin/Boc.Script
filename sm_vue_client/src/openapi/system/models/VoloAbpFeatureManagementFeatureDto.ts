/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpFeatureManagementFeatureProviderDto } from './VoloAbpFeatureManagementFeatureProviderDto';
import type { VoloAbpValidationStringValuesIStringValueType } from './VoloAbpValidationStringValuesIStringValueType';
export type VoloAbpFeatureManagementFeatureDto = {
    name?: string | null;
    displayName?: string | null;
    value?: string | null;
    provider?: VoloAbpFeatureManagementFeatureProviderDto;
    description?: string | null;
    valueType?: VoloAbpValidationStringValuesIStringValueType;
    depth?: number;
    parentName?: string | null;
};

