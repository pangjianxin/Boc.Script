/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpNameValue } from '../models/VoloAbpNameValue';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TimeZoneSettingsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns string Success
     * @throws ApiError
     */
    public timeZoneSettingsGet(): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/setting-management/timezone',
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
    public timeZoneSettingsUpdate({
        timezone,
    }: {
        timezone?: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/setting-management/timezone',
            query: {
                'timezone': timezone,
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
     * @returns VoloAbpNameValue Success
     * @throws ApiError
     */
    public timeZoneSettingsGetTimezones(): CancelablePromise<Array<VoloAbpNameValue>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/setting-management/timezone/timezones',
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
