/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpHttpModelingMethodParameterApiDescriptionModel } from './VoloAbpHttpModelingMethodParameterApiDescriptionModel';
import type { VoloAbpHttpModelingParameterApiDescriptionModel } from './VoloAbpHttpModelingParameterApiDescriptionModel';
import type { VoloAbpHttpModelingReturnValueApiDescriptionModel } from './VoloAbpHttpModelingReturnValueApiDescriptionModel';
export type VoloAbpHttpModelingActionApiDescriptionModel = {
    uniqueName?: string | null;
    name?: string | null;
    httpMethod?: string | null;
    url?: string | null;
    supportedVersions?: Array<string> | null;
    parametersOnMethod?: Array<VoloAbpHttpModelingMethodParameterApiDescriptionModel> | null;
    parameters?: Array<VoloAbpHttpModelingParameterApiDescriptionModel> | null;
    returnValue?: VoloAbpHttpModelingReturnValueApiDescriptionModel;
    allowAnonymous?: boolean | null;
    implementFrom?: string | null;
};

