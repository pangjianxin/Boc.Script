/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpApplicationDtosListResultDtoOfIdentityRoleDto } from '../models/VoloAbpApplicationDtosListResultDtoOfIdentityRoleDto';
import type { VoloAbpApplicationDtosPagedResultDtoOfIdentityUserDto } from '../models/VoloAbpApplicationDtosPagedResultDtoOfIdentityUserDto';
import type { VoloAbpIdentityIdentityUserCreateDto } from '../models/VoloAbpIdentityIdentityUserCreateDto';
import type { VoloAbpIdentityIdentityUserDto } from '../models/VoloAbpIdentityIdentityUserDto';
import type { VoloAbpIdentityIdentityUserUpdateDto } from '../models/VoloAbpIdentityIdentityUserUpdateDto';
import type { VoloAbpIdentityIdentityUserUpdateRolesDto } from '../models/VoloAbpIdentityIdentityUserUpdateRolesDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpIdentityIdentityUserDto Success
     * @throws ApiError
     */
    public userGet({
        id,
    }: {
        id: string,
    }): CancelablePromise<VoloAbpIdentityIdentityUserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/{id}',
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
     * @returns VoloAbpIdentityIdentityUserDto Success
     * @throws ApiError
     */
    public userUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: VoloAbpIdentityIdentityUserUpdateDto,
    }): CancelablePromise<VoloAbpIdentityIdentityUserDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/identity/users/{id}',
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
    public userDelete({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/identity/users/{id}',
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
     * @returns VoloAbpApplicationDtosPagedResultDtoOfIdentityUserDto Success
     * @throws ApiError
     */
    public userGetList({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<VoloAbpApplicationDtosPagedResultDtoOfIdentityUserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users',
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
     * @returns VoloAbpIdentityIdentityUserDto Success
     * @throws ApiError
     */
    public userCreate({
        requestBody,
    }: {
        requestBody?: VoloAbpIdentityIdentityUserCreateDto,
    }): CancelablePromise<VoloAbpIdentityIdentityUserDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/identity/users',
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
     * @returns VoloAbpApplicationDtosListResultDtoOfIdentityRoleDto Success
     * @throws ApiError
     */
    public userGetRoles({
        id,
    }: {
        id: string,
    }): CancelablePromise<VoloAbpApplicationDtosListResultDtoOfIdentityRoleDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/{id}/roles',
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
    public userUpdateRoles({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: VoloAbpIdentityIdentityUserUpdateRolesDto,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/identity/users/{id}/roles',
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
     * @returns VoloAbpApplicationDtosListResultDtoOfIdentityRoleDto Success
     * @throws ApiError
     */
    public userGetAssignableRoles(): CancelablePromise<VoloAbpApplicationDtosListResultDtoOfIdentityRoleDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/assignable-roles',
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
     * @returns VoloAbpIdentityIdentityUserDto Success
     * @throws ApiError
     */
    public userFindByUsername({
        userName,
    }: {
        userName: string,
    }): CancelablePromise<VoloAbpIdentityIdentityUserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/by-username/{userName}',
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
     * @returns VoloAbpIdentityIdentityUserDto Success
     * @throws ApiError
     */
    public userFindByEmail({
        email,
    }: {
        email: string,
    }): CancelablePromise<VoloAbpIdentityIdentityUserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/by-email/{email}',
            path: {
                'email': email,
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
