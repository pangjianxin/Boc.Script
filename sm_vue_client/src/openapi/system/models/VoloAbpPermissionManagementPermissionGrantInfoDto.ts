/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpPermissionManagementProviderInfoDto } from './VoloAbpPermissionManagementProviderInfoDto';
export type VoloAbpPermissionManagementPermissionGrantInfoDto = {
    name?: string | null;
    displayName?: string | null;
    parentName?: string | null;
    isGranted?: boolean;
    allowedProviders?: Array<string> | null;
    grantedProviders?: Array<VoloAbpPermissionManagementProviderInfoDto> | null;
};

