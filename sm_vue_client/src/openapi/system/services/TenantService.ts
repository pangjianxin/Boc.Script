/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpApplicationDtosPagedResultDtoOfTenantDto } from '../models/VoloAbpApplicationDtosPagedResultDtoOfTenantDto';
import type { VoloAbpTenantManagementTenantCreateDto } from '../models/VoloAbpTenantManagementTenantCreateDto';
import type { VoloAbpTenantManagementTenantDto } from '../models/VoloAbpTenantManagementTenantDto';
import type { VoloAbpTenantManagementTenantUpdateDto } from '../models/VoloAbpTenantManagementTenantUpdateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TenantService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpTenantManagementTenantDto Success
     * @throws ApiError
     */
    public tenantGet({
        id,
    }: {
        id: string,
    }): CancelablePromise<VoloAbpTenantManagementTenantDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/multi-tenancy/tenants/{id}',
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
    /**
     * @returns VoloAbpTenantManagementTenantDto Success
     * @throws ApiError
     */
    public tenantUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: VoloAbpTenantManagementTenantUpdateDto,
    }): CancelablePromise<VoloAbpTenantManagementTenantDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/multi-tenancy/tenants/{id}',
            path: {
                'id': id,
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
    public tenantDelete({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/multi-tenancy/tenants/{id}',
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
    /**
     * @returns VoloAbpApplicationDtosPagedResultDtoOfTenantDto Success
     * @throws ApiError
     */
    public tenantGetList({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<VoloAbpApplicationDtosPagedResultDtoOfTenantDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/multi-tenancy/tenants',
            query: {
                'Filter': filter,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
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
     * @returns VoloAbpTenantManagementTenantDto Success
     * @throws ApiError
     */
    public tenantCreate({
        requestBody,
    }: {
        requestBody?: VoloAbpTenantManagementTenantCreateDto,
    }): CancelablePromise<VoloAbpTenantManagementTenantDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/multi-tenancy/tenants',
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
     * @returns string Success
     * @throws ApiError
     */
    public tenantGetDefaultConnectionString({
        id,
    }: {
        id: string,
    }): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
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
    /**
     * @returns any Success
     * @throws ApiError
     */
    public tenantUpdateDefaultConnectionString({
        id,
        defaultConnectionString,
    }: {
        id: string,
        defaultConnectionString?: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
            path: {
                'id': id,
            },
            query: {
                'defaultConnectionString': defaultConnectionString,
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
    public tenantDeleteDefaultConnectionString({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
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
