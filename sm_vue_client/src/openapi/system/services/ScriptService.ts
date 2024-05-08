/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AutoFiltererEnumsCombineType } from '../models/AutoFiltererEnumsCombineType';
import type { BocSmScriptsDtosCreateScriptDto } from '../models/BocSmScriptsDtosCreateScriptDto';
import type { BocSmScriptsDtosDownloadScriptDto } from '../models/BocSmScriptsDtosDownloadScriptDto';
import type { BocSmScriptsDtosScriptDto } from '../models/BocSmScriptsDtosScriptDto';
import type { BocSmScriptsDtosUpdateScriptDto } from '../models/BocSmScriptsDtosUpdateScriptDto';
import type { VoloAbpApplicationDtosPagedResultDtoOfScriptDto } from '../models/VoloAbpApplicationDtosPagedResultDtoOfScriptDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ScriptService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns BocSmScriptsDtosScriptDto Success
     * @throws ApiError
     */
    public scriptCreate({
        requestBody,
    }: {
        requestBody?: BocSmScriptsDtosCreateScriptDto,
    }): CancelablePromise<BocSmScriptsDtosScriptDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/sm/script',
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
     * @returns VoloAbpApplicationDtosPagedResultDtoOfScriptDto Success
     * @throws ApiError
     */
    public scriptGetList({
        filter,
        categoryId,
        skipCount,
        maxResultCount,
        sorting,
        combineWith,
    }: {
        filter?: string,
        categoryId?: string,
        skipCount?: number,
        maxResultCount?: number,
        sorting?: string,
        combineWith?: AutoFiltererEnumsCombineType,
    }): CancelablePromise<VoloAbpApplicationDtosPagedResultDtoOfScriptDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/sm/script',
            query: {
                'Filter': filter,
                'CategoryId': categoryId,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
                'Sorting': sorting,
                'CombineWith': combineWith,
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
    public scriptDelete({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/sm/script/{id}',
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
     * @returns BocSmScriptsDtosScriptDto Success
     * @throws ApiError
     */
    public scriptGet({
        id,
    }: {
        id: string,
    }): CancelablePromise<BocSmScriptsDtosScriptDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/sm/script/{id}',
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
     * @returns BocSmScriptsDtosScriptDto Success
     * @throws ApiError
     */
    public scriptUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: BocSmScriptsDtosUpdateScriptDto,
    }): CancelablePromise<BocSmScriptsDtosScriptDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/sm/script/{id}',
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
     * @returns binary Success
     * @throws ApiError
     */
    public scriptDownload({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: BocSmScriptsDtosDownloadScriptDto,
    }): CancelablePromise<Blob> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/sm/script/download/{id}',
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
     * @returns string Success
     * @throws ApiError
     */
    public scriptResolveParameters({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/sm/script/resolve-parameter/{id}',
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
