<template>
    <v-container fluid>
        <v-card>
            <div class="d-flex flex-column pa-10">
                <v-avatar size="120" class="mx-auto elevation-12" color="white">
                    <v-img :src="userLogo"> </v-img>
                </v-avatar>

                <div class="text-center mt-5">
                    <h3 class="text-h6 font-weight-bold">
                        {{ profileInfo.userName }}
                    </h3>
                    <v-chip size="small" class="font-weight-bold" color="blue">
                        {{ profileInfo.email }}
                    </v-chip>
                </div>
                <div class="py-5 text-center px-10">
                    <v-icon color="grey" :icon="mdiPhoneOutline"> </v-icon>
                    <span class="ml-1">{{ profileInfo.phoneNumber ?? "暂无手机信息" }}</span>
                </div>
            </div>
            <v-divider></v-divider>

            <v-tabs v-model="selectedTab" color="primary" grow>
                <v-tab v-for="(item, index) in tabs" :key="index">
                    <v-icon :icon="mdiCog"></v-icon>
                    &nbsp;{{ item }}
                </v-tab>
            </v-tabs>

            <v-window v-model="selectedTab">
                <v-window-item value="基础信息">
                    <v-form ref="profileFormRef" v-model="profileFormValid" @submit.prevent="submitUpdateProfile">
                        <v-card class="mt-5">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="用户名" v-model="profileForm.userName" color="primary"
                                            variant="outlined" density="compact" type="text" placeholder="登录用户名"
                                            :rules="profileFormRules.userName">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="姓名" v-model="profileForm.name" color="primary"
                                            variant="outlined" density="compact" type="text" placeholder="用户姓名"
                                            :rules="profileFormRules.name" />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="手机" v-model="profileForm.phoneNumber" color="primary"
                                            variant="outlined" density="compact" type="text" placeholder="手机"
                                            :rules="profileFormRules.phoneNumber">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="邮箱" v-model="profileForm.email" color="primary"
                                            variant="outlined" density="compact" type="text" placeholder="邮箱"
                                            :rules="profileFormRules.email">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions class="pa-5">
                                <v-spacer></v-spacer>
                                <v-btn class="px-5" type="submit" color="primary" elevation="1" variant="elevated">
                                    提交
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-window-item>
                <v-window-item value="修改密码">
                    <v-form ref="passwordFormRef" v-model="passwordFormValid" @submit.prevent="submitChangePassword">
                        <v-card class="mt-5">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="当前密码" v-model="passwordForm.currentPassword"
                                            autocomplete="off" density="compact" color="primary" variant="outlined"
                                            :type="currentPasswordShow ? 'text' : 'password'" placeholder="当前密码"
                                            :append-inner-icon="currentPasswordShow ? mdiEye : mdiEyeOff"
                                            @click:append-inner="currentPasswordShow = !currentPasswordShow"
                                            :rules="passwordFormRules.currentPassword">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="新密码" v-model="passwordForm.newPassword" density="compact"
                                            autocomplete="off" color="primary" variant="outlined"
                                            :type="newPasswordShow ? 'text' : 'password'" placeholder="新密码"
                                            :append-inner-icon="newPasswordShow ? mdiEye : mdiEyeOff"
                                            @click:append-inner="newPasswordShow = !newPasswordShow"
                                            :rules="passwordFormRules.newPassword">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions class="pa-5">
                                <v-spacer></v-spacer>
                                <v-btn class="px-5" type="submit" color="primary" elevation="1" variant="elevated">
                                    提交
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-window-item>
            </v-window>
        </v-card>

    </v-container>
</template>

<script setup lang="ts">
import userLogo from '@/assets/user.png'
import { useProfileForm } from './hooks/useProfileForm';
import { useChangePasswordForm } from './hooks/useChangePasswordForm';
import {
    VoloAbpAccountProfileDto, SystemClient,
} from '@/openapi/system';
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
import { mdiPhoneOutline, mdiCog, mdiEye, mdiEyeOff } from '@mdi/js';
const { profileFormValid, profileForm, profileFormRules, submitUpdateProfile, initProfileInfo } = useProfileForm();
const { passwordFormValid, passwordForm, passwordFormRules, currentPasswordShow, newPasswordShow, submitChangePassword } = useChangePasswordForm();
const systemClient = new SystemClient(OpenAPI);
let profileFormRef = ref();
let passwordFormRef = ref();
let selectedTab = ref("");
let tabs = ref(["基础信息", "修改密码"]);

let profileInfo: Ref<VoloAbpAccountProfileDto> = ref({});

onMounted(async () => {
    let res = await systemClient.profile.profileGet();
    profileInfo.value = res;
    initProfileInfo(res);
})
</script>

<style scoped></style>
<route lang="yaml">
name: account
meta: 
  title: 我的信息
  visible: false
  auth: true
</route>