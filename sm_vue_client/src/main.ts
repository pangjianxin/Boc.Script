import App from "./App.vue";
import router from "./router";
import { vuetify } from "@/plugins/vuetify";
import pinia from "@/store";
import { usePermissionsDirective } from "@/directives/permission";
import { initializeOidcEvents } from "@/utils/oidc-user-manager";
import "core-js/features/array/at";
import "unfonts.css";
import "./styles/index.scss";
//init app
const app = createApp(App);
app.use(vuetify);
app.use(pinia);
app.use(router);
//init oidc events
initializeOidcEvents();
//directives
usePermissionsDirective(app);

//global error handler
app.config.errorHandler = (err, instance, info) => {
  // Handle the error globally
  console.error("Global error:", err);
  console.log("Vue instance:", instance);
  console.log("Error info:", info);

  // Add code for UI notifications, reporting or other error handling logic
};
app.mount("#app");
