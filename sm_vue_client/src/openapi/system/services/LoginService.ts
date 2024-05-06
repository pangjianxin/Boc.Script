/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpAccountWebAreasAccountControllersModelsAbpLoginResult } from '../models/VoloAbpAccountWebAreasAccountControllersModelsAbpLoginResult';
import type { VoloAbpAccountWebAreasAccountControllersModelsUserLoginInfo } from '../models/VoloAbpAccountWebAreasAccountControllersModelsUserLoginInfo';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class LoginService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns VoloAbpAccountWebAreasAccountControllersModelsAbpLoginResult Success
     * @throws ApiError
     */
    public loginLogin({
        requestBody,
    }: {
        requestBody?: VoloAbpAccountWebAreasAccountControllersModelsUserLoginInfo,
    }): CancelablePromise<VoloAbpAccountWebAreasAccountControllersModelsAbpLoginResult> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/login',
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
    public loginLogout(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/account/logout',
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
     * @returns VoloAbpAccountWebAreasAccountControllersModelsAbpLoginResult Success
     * @throws ApiError
     */
    public loginCheckPassword({
        requestBody,
    }: {
        requestBody?: VoloAbpAccountWebAreasAccountControllersModelsUserLoginInfo,
    }): CancelablePromise<VoloAbpAccountWebAreasAccountControllersModelsAbpLoginResult> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/check-password',
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
