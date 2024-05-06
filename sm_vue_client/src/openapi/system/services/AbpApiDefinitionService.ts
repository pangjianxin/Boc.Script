/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpHttpModelingApplicationApiDescriptionModel } from '../models/VoloAbpHttpModelingApplicationApiDescriptionModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AbpApiDefinitionService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpHttpModelingApplicationApiDescriptionModel Success
     * @throws ApiError
     */
    public abpApiDefinitionGet({
        includeTypes,
    }: {
        includeTypes?: boolean,
    }): CancelablePromise<VoloAbpHttpModelingApplicationApiDescriptionModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/abp/api-definition',
            query: {
                'IncludeTypes': includeTypes,
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
