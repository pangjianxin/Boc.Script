/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BocSmIdentityOptionsDtosIdentityPasswordOptionsSettingDto } from '../models/BocSmIdentityOptionsDtosIdentityPasswordOptionsSettingDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class IdentityOptionsSettingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns BocSmIdentityOptionsDtosIdentityPasswordOptionsSettingDto Success
     * @throws ApiError
     */
    public identityOptionsSettingGetPasswordOptions(): CancelablePromise<BocSmIdentityOptionsDtosIdentityPasswordOptionsSettingDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/options/password',
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
    public identityOptionsSettingUpdatePasswordOptions({
        requestBody,
    }: {
        requestBody?: BocSmIdentityOptionsDtosIdentityPasswordOptionsSettingDto,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/identity/options/password',
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
