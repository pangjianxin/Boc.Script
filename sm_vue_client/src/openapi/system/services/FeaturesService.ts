/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpFeatureManagementGetFeatureListResultDto } from '../models/VoloAbpFeatureManagementGetFeatureListResultDto';
import type { VoloAbpFeatureManagementUpdateFeaturesDto } from '../models/VoloAbpFeatureManagementUpdateFeaturesDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FeaturesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpFeatureManagementGetFeatureListResultDto Success
     * @throws ApiError
     */
    public featuresGet({
        providerName,
        providerKey,
    }: {
        providerName?: string,
        providerKey?: string,
    }): CancelablePromise<VoloAbpFeatureManagementGetFeatureListResultDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/feature-management/features',
            query: {
                'providerName': providerName,
                'providerKey': providerKey,
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
    /**
     * @returns any Success
     * @throws ApiError
     */
    public featuresUpdate({
        providerName,
        providerKey,
        requestBody,
    }: {
        providerName?: string,
        providerKey?: string,
        requestBody?: VoloAbpFeatureManagementUpdateFeaturesDto,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/feature-management/features',
            query: {
                'providerName': providerName,
                'providerKey': providerKey,
            },
            body: requestBody,
            mediaType: 'application/json',
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
    /**
     * @returns any Success
     * @throws ApiError
     */
    public featuresDelete({
        providerName,
        providerKey,
    }: {
        providerName?: string,
        providerKey?: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/feature-management/features',
            query: {
                'providerName': providerName,
                'providerKey': providerKey,
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
