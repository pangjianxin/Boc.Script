/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationDto } from '../models/VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AbpApplicationLocalizationService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationDto Success
     * @throws ApiError
     */
    public abpApplicationLocalizationGet({
        cultureName,
        onlyDynamics,
    }: {
        cultureName: string,
        onlyDynamics?: boolean,
    }): CancelablePromise<VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/abp/application-localization',
            query: {
                'CultureName': cultureName,
                'OnlyDynamics': onlyDynamics,
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
