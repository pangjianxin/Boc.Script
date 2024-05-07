/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router/types'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    'index': RouteRecordInfo<'index', '/', Record<never, never>, Record<never, never>>,
    'not-found': RouteRecordInfo<'not-found', '/:path(.*)', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    'account': RouteRecordInfo<'account', '/1_account', Record<never, never>, Record<never, never>>,
    'script.index': RouteRecordInfo<'script.index', '/2_scripts', Record<never, never>, Record<never, never>>,
    'category.index': RouteRecordInfo<'category.index', '/3_categories', Record<never, never>, Record<never, never>>,
    'tenant.index': RouteRecordInfo<'tenant.index', '/997_tenants', Record<never, never>, Record<never, never>>,
    'identity.options': RouteRecordInfo<'identity.options', '/999_identity/options', Record<never, never>, Record<never, never>>,
    'identity.role.index': RouteRecordInfo<'identity.role.index', '/999_identity/roles', Record<never, never>, Record<never, never>>,
    'identity.user.index': RouteRecordInfo<'identity.user.index', '/999_identity/users', Record<never, never>, Record<never, never>>,
    'login': RouteRecordInfo<'login', '/login', Record<never, never>, Record<never, never>>,
    'login.oidc.callback': RouteRecordInfo<'login.oidc.callback', '/login/oidc/callback', Record<never, never>, Record<never, never>>,
  }
}
