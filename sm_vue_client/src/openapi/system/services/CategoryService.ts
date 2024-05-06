/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AutoFiltererEnumsCombineType } from '../models/AutoFiltererEnumsCombineType';
import type { BocSmCategoriesDtosCategoryDto } from '../models/BocSmCategoriesDtosCategoryDto';
import type { BocSmCategoriesDtosCreateUpdateCategoryDto } from '../models/BocSmCategoriesDtosCreateUpdateCategoryDto';
import type { VoloAbpApplicationDtosPagedResultDtoOfCategoryDto } from '../models/VoloAbpApplicationDtosPagedResultDtoOfCategoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CategoryService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns BocSmCategoriesDtosCategoryDto Success
     * @throws ApiError
     */
    public categoryCreate({
        requestBody,
    }: {
        requestBody?: BocSmCategoriesDtosCreateUpdateCategoryDto,
    }): CancelablePromise<BocSmCategoriesDtosCategoryDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/category',
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
     * @returns VoloAbpApplicationDtosPagedResultDtoOfCategoryDto Success
     * @throws ApiError
     */
    public categoryGetList({
        filter,
        skipCount,
        maxResultCount,
        sorting,
        combineWith,
    }: {
        filter?: string,
        skipCount?: number,
        maxResultCount?: number,
        sorting?: string,
        combineWith?: AutoFiltererEnumsCombineType,
    }): CancelablePromise<VoloAbpApplicationDtosPagedResultDtoOfCategoryDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/category',
            query: {
                'Filter': filter,
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
     * @returns BocSmCategoriesDtosCategoryDto Success
     * @throws ApiError
     */
    public categoryUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: BocSmCategoriesDtosCreateUpdateCategoryDto,
    }): CancelablePromise<BocSmCategoriesDtosCategoryDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/app/category/{id}',
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
    public categoryDelete({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/app/category/{id}',
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
     * @returns BocSmCategoriesDtosCategoryDto Success
     * @throws ApiError
     */
    public categoryGet({
        id,
    }: {
        id: string,
    }): CancelablePromise<BocSmCategoriesDtosCategoryDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/category/{id}',
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
