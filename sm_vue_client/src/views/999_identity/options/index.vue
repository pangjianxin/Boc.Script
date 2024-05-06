<template>
    <v-card>
        <v-toolbar :color="themeStore.toolbarBgColor">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>认证系统设置</v-toolbar-title>
            <template v-slot:extension>
                <v-tabs v-model="windowModel" align-tabs="start">
                    <v-tab value="password">
                        <v-icon :icon="mdiLockAlertOutline"></v-icon>
                        密码强度设置
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>

        <v-window v-model="windowModel">
            <v-window-item :value="'password'">
                <identityPasswordOptionsSetting></identityPasswordOptionsSetting>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script setup lang="ts">
import identityPasswordOptionsSetting from './components/identityPasswordOptionsSetting.vue';
// import headerBg from '@/assets/header-bg.jpg';
import { useThemeStore } from '@/store/themeStore';
import { mdiLockAlertOutline } from '@mdi/js';
const themeStore = useThemeStore();
const windowModel = ref("password");
</script>

<style scoped></style>

<route lang="yaml">
name: identity.options
meta: 
 icon: $mdiFileCogOutline
 visible: true
 title: 身份设置
 desc: 身份认证
 auth: true
 permissions:
    - AbpIdentity.Users
</route>