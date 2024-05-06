/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpAccountChangePasswordInput } from '../models/VoloAbpAccountChangePasswordInput';
import type { VoloAbpAccountProfileDto } from '../models/VoloAbpAccountProfileDto';
import type { VoloAbpAccountUpdateProfileDto } from '../models/VoloAbpAccountUpdateProfileDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProfileService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpAccountProfileDto Success
     * @throws ApiError
     */
    public profileGet(): CancelablePromise<VoloAbpAccountProfileDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/account/my-profile',
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
     * @returns VoloAbpAccountProfileDto Success
     * @throws ApiError
     */
    public profileUpdate({
        requestBody,
    }: {
        requestBody?: VoloAbpAccountUpdateProfileDto,
    }): CancelablePromise<VoloAbpAccountProfileDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/account/my-profile',
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
    public profileChangePassword({
        requestBody,
    }: {
        requestBody?: VoloAbpAccountChangePasswordInput,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/my-profile/change-password',
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
