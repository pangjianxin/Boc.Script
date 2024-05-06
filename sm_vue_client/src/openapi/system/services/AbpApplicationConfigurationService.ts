/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationConfigurationDto } from '../models/VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationConfigurationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AbpApplicationConfigurationService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationConfigurationDto Success
     * @throws ApiError
     */
    public abpApplicationConfigurationGet({
        includeLocalizationResources,
    }: {
        includeLocalizationResources?: boolean,
    }): CancelablePromise<VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationConfigurationDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/abp/application-configuration',
            query: {
                'IncludeLocalizationResources': includeLocalizationResources,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
}
