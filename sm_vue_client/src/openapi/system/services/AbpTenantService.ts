/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpAspNetCoreMvcMultiTenancyFindTenantResultDto } from '../models/VoloAbpAspNetCoreMvcMultiTenancyFindTenantResultDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AbpTenantService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpAspNetCoreMvcMultiTenancyFindTenantResultDto Success
     * @throws ApiError
     */
    public abpTenantFindTenantByName({
        name,
    }: {
        name: string,
    }): CancelablePromise<VoloAbpAspNetCoreMvcMultiTenancyFindTenantResultDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/abp/multi-tenancy/tenants/by-name/{name}',
            path: {
                'name': name,
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
     * @returns VoloAbpAspNetCoreMvcMultiTenancyFindTenantResultDto Success
     * @throws ApiError
     */
    public abpTenantFindTenantById({
        id,
    }: {
        id: string,
    }): CancelablePromise<VoloAbpAspNetCoreMvcMultiTenancyFindTenantResultDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/abp/multi-tenancy/tenants/by-id/{id}',
            path: {
                'id': id,
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
