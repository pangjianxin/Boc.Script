import { App } from "vue";
import { useAbpSessionStore } from "@/store/abpSessionStore";

export const usePermissionsDirective = (app: App) => {
  const abpSessionStore = useAbpSessionStore();
  app.directive("permission", {
    mounted: (el, binding) => {
      if (!abpSessionStore.isPermitted(binding.value)) {
        if (binding.modifiers["disabled"]) {
          el.disabled = true;
        } else {
          el.parentNode?.removeChild(el);
        }
      }
    },
  });
};
