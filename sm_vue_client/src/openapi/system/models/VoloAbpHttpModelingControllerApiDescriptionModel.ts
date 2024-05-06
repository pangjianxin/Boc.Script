/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VoloAbpHttpModelingActionApiDescriptionModel } from './VoloAbpHttpModelingActionApiDescriptionModel';
import type { VoloAbpHttpModelingControllerInterfaceApiDescriptionModel } from './VoloAbpHttpModelingControllerInterfaceApiDescriptionModel';
export type VoloAbpHttpModelingControllerApiDescriptionModel = {
    controllerName?: string | null;
    controllerGroupName?: string | null;
    isRemoteService?: boolean;
    isIntegrationService?: boolean;
    apiVersion?: string | null;
    type?: string | null;
    interfaces?: Array<VoloAbpHttpModelingControllerInterfaceApiDescriptionModel> | null;
    actions?: Record<string, VoloAbpHttpModelingActionApiDescriptionModel> | null;
};

