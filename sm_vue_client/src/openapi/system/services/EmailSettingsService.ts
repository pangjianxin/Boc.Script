/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpSettingManagementEmailSettingsDto } from '../models/VoloAbpSettingManagementEmailSettingsDto';
import type { VoloAbpSettingManagementSendTestEmailInput } from '../models/VoloAbpSettingManagementSendTestEmailInput';
import type { VoloAbpSettingManagementUpdateEmailSettingsDto } from '../models/VoloAbpSettingManagementUpdateEmailSettingsDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class EmailSettingsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpSettingManagementEmailSettingsDto Success
     * @throws ApiError
     */
    public emailSettingsGet(): CancelablePromise<VoloAbpSettingManagementEmailSettingsDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/setting-management/emailing',
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
    public emailSettingsUpdate({
        requestBody,
    }: {
        requestBody?: VoloAbpSettingManagementUpdateEmailSettingsDto,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/setting-management/emailing',
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
    public emailSettingsSendTestEmail({
        requestBody,
    }: {
        requestBody?: VoloAbpSettingManagementSendTestEmailInput,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/setting-management/emailing/send-test-email',
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
