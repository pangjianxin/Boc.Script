/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpApplicationDtosListResultDtoOfUserData } from '../models/VoloAbpApplicationDtosListResultDtoOfUserData';
import type { VoloAbpUsersUserData } from '../models/VoloAbpUsersUserData';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserLookupService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpUsersUserData Success
     * @throws ApiError
     */
    public userLookupFindById({
        id,
    }: {
        id: string,
    }): CancelablePromise<VoloAbpUsersUserData> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/lookup/{id}',
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
     * @returns VoloAbpUsersUserData Success
     * @throws ApiError
     */
    public userLookupFindByUserName({
        userName,
    }: {
        userName: string,
    }): CancelablePromise<VoloAbpUsersUserData> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/lookup/by-username/{userName}',
            path: {
                'userName': userName,
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
     * @returns VoloAbpApplicationDtosListResultDtoOfUserData Success
     * @throws ApiError
     */
    public userLookupSearch({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<VoloAbpApplicationDtosListResultDtoOfUserData> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/lookup/search',
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
     * @returns number Success
     * @throws ApiError
     */
    public userLookupGetCount({
        filter,
    }: {
        filter?: string,
    }): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/lookup/count',
            query: {
                'Filter': filter,
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
