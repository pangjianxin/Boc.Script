import { setupLayouts } from "virtual:generated-layouts";
import { useGlobalStore } from "@/store/globalStore";
import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";
import { userManager } from "@/utils/oidc-user-manager";
const router = createRouter({
  routes: setupLayouts(routes),
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to: any, from: any, next: any) => {
  const user = await userManager.getUser();
  const requiredAuth = to.meta?.auth === true;
  const tokenExpired = user?.expired !== false;
  if (to.path != "/login" && requiredAuth && tokenExpired) {
    const globalStore = useGlobalStore();
    globalStore.setSnackbarText("该页面需要登录");
    next("/login");
  } else {
    next();
  }
});

router.afterEach(() => {});

export default router;
