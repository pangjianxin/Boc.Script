<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { userManager } from '@/utils/oidc-user-manager';

const router = useRouter();

const callback = async () => {
  await userManager.signinRedirectCallback();
  await router.push({ name: "index" });
}

onMounted(async () => {
  await callback();
});
</script>

<style scoped></style>

<route lang="yaml">
name: login.oidc.callback
meta: 
  visible: false
  auth: false

</route>