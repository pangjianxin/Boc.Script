/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpApplicationDtosListResultDtoOfIdentityRoleDto } from '../models/VoloAbpApplicationDtosListResultDtoOfIdentityRoleDto';
import type { VoloAbpApplicationDtosPagedResultDtoOfIdentityRoleDto } from '../models/VoloAbpApplicationDtosPagedResultDtoOfIdentityRoleDto';
import type { VoloAbpIdentityIdentityRoleCreateDto } from '../models/VoloAbpIdentityIdentityRoleCreateDto';
import type { VoloAbpIdentityIdentityRoleDto } from '../models/VoloAbpIdentityIdentityRoleDto';
import type { VoloAbpIdentityIdentityRoleUpdateDto } from '../models/VoloAbpIdentityIdentityRoleUpdateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class RoleService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpApplicationDtosListResultDtoOfIdentityRoleDto Success
     * @throws ApiError
     */
    public roleGetAllList(): CancelablePromise<VoloAbpApplicationDtosListResultDtoOfIdentityRoleDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/roles/all',
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
     * @returns VoloAbpApplicationDtosPagedResultDtoOfIdentityRoleDto Success
     * @throws ApiError
     */
    public roleGetList({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<VoloAbpApplicationDtosPagedResultDtoOfIdentityRoleDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/roles',
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
     * @returns VoloAbpIdentityIdentityRoleDto Success
     * @throws ApiError
     */
    public roleCreate({
        requestBody,
    }: {
        requestBody?: VoloAbpIdentityIdentityRoleCreateDto,
    }): CancelablePromise<VoloAbpIdentityIdentityRoleDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/identity/roles',
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
     * @returns VoloAbpIdentityIdentityRoleDto Success
     * @throws ApiError
     */
    public roleGet({
        id,
    }: {
        id: string,
    }): CancelablePromise<VoloAbpIdentityIdentityRoleDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/roles/{id}',
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
     * @returns VoloAbpIdentityIdentityRoleDto Success
     * @throws ApiError
     */
    public roleUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: VoloAbpIdentityIdentityRoleUpdateDto,
    }): CancelablePromise<VoloAbpIdentityIdentityRoleDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/identity/roles/{id}',
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
    public roleDelete({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/identity/roles/{id}',
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
