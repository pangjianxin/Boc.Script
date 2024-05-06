<template>
  <v-app :theme="theme">
    <router-view>
    </router-view>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarText }}
      <template #actions>
        <v-btn :icon="mdiClose" @click="globalStore.closeSnackbar()" />
      </template>
    </v-snackbar>
    <v-overlay v-model="loading" app class="justify-center align-center">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </v-app>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/store/themeStore';
import { useGlobalStore } from './store/globalStore';
import { mdiClose } from '@mdi/js';
import { ApiError } from './openapi/system/core/ApiError';
const globalStore = useGlobalStore();
const {
  snackbarText,
  loading,
  snackbar,
  snackbarColor } = storeToRefs(globalStore);
const { theme } = storeToRefs(useThemeStore());

const router = useRouter();
const parseAbpError = (response: ApiError) => {
  let body = response.body;
  if (body && body.error) {
    let message = body.error.message;
    if (body.error.validationErrors) {
      message +=
        ": " +
        body.error.validationErrors.map((e: any) => e.message).join(", ");
    }
    return message;
  }
  return response.statusText;
};
onErrorCaptured((err: Error) => {
  if (err.name == "ApiError") {
    const parsedError = err as ApiError;
    if (parsedError.status === 401) {
      globalStore.setSnackbarText("请先登录", "warning");
      router.push({ name: "login" });
      return false;
    }
    let msg = parseAbpError(parsedError);
    globalStore.setSnackbarText(msg, "warning");
  } else {
    globalStore.setSnackbarText(err.message, "error");
  }

  return false;
});
</script>
<style scoped lang="scss"></style>