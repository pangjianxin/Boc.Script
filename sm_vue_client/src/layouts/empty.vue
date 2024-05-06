<template>
    <router-view></router-view>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ snackbarText }}
        <template #actions>
            <v-btn :icon="mdiClose" @click="globalStore.closeSnackbar()" />
        </template>
    </v-snackbar>
    <v-overlay v-model="loading" app class="justify-center align-center">
        <v-progress-circular indeterminate size="64" />
    </v-overlay>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/globalStore';
import { mdiClose } from '@mdi/js';
const globalStore = useGlobalStore();
const { snackbar, loading, snackbarColor, snackbarText } = storeToRefs(globalStore);
</script>

<style scoped></style>