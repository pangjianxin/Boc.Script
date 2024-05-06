import { useTheme } from "vuetify";
import { useDisplay } from "vuetify";

export const useThemeStore = defineStore(
  "theme-store",
  () => {
    const themeInstance = useTheme();
    const displayInstance = useDisplay();
    const theme = ref("light");
    const mobile = computed(() => displayInstance.mobile.value);

    //顶部app-bar背景颜色
    const appBarBgColor = ref("");

    const toolbarBgColor = ref("#3F51B5");

    const toggleTheme = () => {
      themeInstance.global.name.value = themeInstance.global.current.value.dark
        ? "light"
        : "dark";
    };

    watch(
      () => themeInstance.global.name.value,
      (newVal) => {
        theme.value = newVal;
      }
    );

    return { theme, toggleTheme, mobile, appBarBgColor, toolbarBgColor };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["theme"],
      key: "theme-store",
    },
  }
);
