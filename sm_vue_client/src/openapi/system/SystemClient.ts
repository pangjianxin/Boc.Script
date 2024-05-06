/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { AbpApiDefinitionService } from './services/AbpApiDefinitionService';
import { AbpApplicationConfigurationService } from './services/AbpApplicationConfigurationService';
import { AbpApplicationLocalizationService } from './services/AbpApplicationLocalizationService';
import { AbpTenantService } from './services/AbpTenantService';
import { AccountService } from './services/AccountService';
import { CategoryService } from './services/CategoryService';
import { DynamicClaimsService } from './services/DynamicClaimsService';
import { EmailSettingsService } from './services/EmailSettingsService';
import { FeaturesService } from './services/FeaturesService';
import { IdentityOptionsSettingService } from './services/IdentityOptionsSettingService';
import { LoginService } from './services/LoginService';
import { PermissionsService } from './services/PermissionsService';
import { ProfileService } from './services/ProfileService';
import { RoleService } from './services/RoleService';
import { ScriptService } from './services/ScriptService';
import { TenantService } from './services/TenantService';
import { TimeZoneSettingsService } from './services/TimeZoneSettingsService';
import { UserService } from './services/UserService';
import { UserLookupService } from './services/UserLookupService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class SystemClient {
    public readonly abpApiDefinition: AbpApiDefinitionService;
    public readonly abpApplicationConfiguration: AbpApplicationConfigurationService;
    public readonly abpApplicationLocalization: AbpApplicationLocalizationService;
    public readonly abpTenant: AbpTenantService;
    public readonly account: AccountService;
    public readonly category: CategoryService;
    public readonly dynamicClaims: DynamicClaimsService;
    public readonly emailSettings: EmailSettingsService;
    public readonly features: FeaturesService;
    public readonly identityOptionsSetting: IdentityOptionsSettingService;
    public readonly login: LoginService;
    public readonly permissions: PermissionsService;
    public readonly profile: ProfileService;
    public readonly role: RoleService;
    public readonly script: ScriptService;
    public readonly tenant: TenantService;
    public readonly timeZoneSettings: TimeZoneSettingsService;
    public readonly user: UserService;
    public readonly userLookup: UserLookupService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.abpApiDefinition = new AbpApiDefinitionService(this.request);
        this.abpApplicationConfiguration = new AbpApplicationConfigurationService(this.request);
        this.abpApplicationLocalization = new AbpApplicationLocalizationService(this.request);
        this.abpTenant = new AbpTenantService(this.request);
        this.account = new AccountService(this.request);
        this.category = new CategoryService(this.request);
        this.dynamicClaims = new DynamicClaimsService(this.request);
        this.emailSettings = new EmailSettingsService(this.request);
        this.features = new FeaturesService(this.request);
        this.identityOptionsSetting = new IdentityOptionsSettingService(this.request);
        this.login = new LoginService(this.request);
        this.permissions = new PermissionsService(this.request);
        this.profile = new ProfileService(this.request);
        this.role = new RoleService(this.request);
        this.script = new ScriptService(this.request);
        this.tenant = new TenantService(this.request);
        this.timeZoneSettings = new TimeZoneSettingsService(this.request);
        this.user = new UserService(this.request);
        this.userLookup = new UserLookupService(this.request);
    }
}

