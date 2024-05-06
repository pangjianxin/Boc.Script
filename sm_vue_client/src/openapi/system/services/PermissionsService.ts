/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpPermissionManagementGetPermissionListResultDto } from '../models/VoloAbpPermissionManagementGetPermissionListResultDto';
import type { VoloAbpPermissionManagementUpdatePermissionsDto } from '../models/VoloAbpPermissionManagementUpdatePermissionsDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PermissionsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpPermissionManagementGetPermissionListResultDto Success
     * @throws ApiError
     */
    public permissionsGet({
        providerName,
        providerKey,
    }: {
        providerName?: string,
        providerKey?: string,
    }): CancelablePromise<VoloAbpPermissionManagementGetPermissionListResultDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/permission-management/permissions',
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
    public permissionsUpdate({
        providerName,
        providerKey,
        requestBody,
    }: {
        providerName?: string,
        providerKey?: string,
        requestBody?: VoloAbpPermissionManagementUpdatePermissionsDto,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/permission-management/permissions',
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
}
