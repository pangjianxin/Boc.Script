/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpAccountRegisterDto } from '../models/VoloAbpAccountRegisterDto';
import type { VoloAbpAccountResetPasswordDto } from '../models/VoloAbpAccountResetPasswordDto';
import type { VoloAbpAccountSendPasswordResetCodeDto } from '../models/VoloAbpAccountSendPasswordResetCodeDto';
import type { VoloAbpAccountVerifyPasswordResetTokenInput } from '../models/VoloAbpAccountVerifyPasswordResetTokenInput';
import type { VoloAbpIdentityIdentityUserDto } from '../models/VoloAbpIdentityIdentityUserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AccountService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpIdentityIdentityUserDto Success
     * @throws ApiError
     */
    public accountRegister({
        requestBody,
    }: {
        requestBody?: VoloAbpAccountRegisterDto,
    }): CancelablePromise<VoloAbpIdentityIdentityUserDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/register',
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
    public accountSendPasswordResetCode({
        requestBody,
    }: {
        requestBody?: VoloAbpAccountSendPasswordResetCodeDto,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/send-password-reset-code',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public accountVerifyPasswordResetToken({
        requestBody,
    }: {
        requestBody?: VoloAbpAccountVerifyPasswordResetTokenInput,
    }): CancelablePromise<boolean> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/verify-password-reset-token',
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
    public accountResetPassword({
        requestBody,
    }: {
        requestBody?: VoloAbpAccountResetPasswordDto,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/reset-password',
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
