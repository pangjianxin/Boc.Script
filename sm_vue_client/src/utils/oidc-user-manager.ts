import { UserManager, WebStorageStateStore } from "oidc-client-ts";
import { useAbpSessionStore } from "@/store/abpSessionStore";
export const userManager = new UserManager({
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  scope: import.meta.env.VITE_OIDC_SCOPE,
  response_type: import.meta.env.VITE_OIDC_RESPONSE_TYPE,
  post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI,
  accessTokenExpiringNotificationTimeInSeconds: 30,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});

export function initializeOidcEvents() {
  userManager.events.addAccessTokenExpired(async () => {
    console.log("access token expired");
    const abpSessionStore = useAbpSessionStore();
    abpSessionStore.clearState();
    userManager.startSilentRenew();
  });

  userManager.events.addAccessTokenExpiring(async () => {
    console.log("access token expiring");
    userManager.startSilentRenew();
  });

  userManager.events.addUserUnloaded(() => {
    console.log("user unloaded");
  });

  userManager.events.addSilentRenewError((error) => {
    console.error("silent renew error", error);
  });

  userManager.events.addUserSignedOut(() => {
    console.log("user signed out");
    const abpSessionStore = useAbpSessionStore();
    abpSessionStore.clearState();
  });

  userManager.events.addUserLoaded(async () => {
    console.log("user loaded");
    const abpSessionStore = useAbpSessionStore();
    await abpSessionStore.fetchSession();
  });
}
