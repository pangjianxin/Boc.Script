<template>
    <v-dialog transition="dialog-top-transition" :fullscreen="themeStore.mobile" :width="themeStore.mobile ? '100%' : '50%'"
        :model-value="show" :persistent="true" :scrollable="true">

        <v-form v-model="createFormValid" ref="createFormRef" @submit.prevent="onSubmitCreateIdentityUser">
            <v-card>
                <v-toolbar :color="themeStore.toolbarBgColor" extended>
                    <v-toolbar-title>
                        创建用户信息
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" :icon="mdiPower" @click="closeDialog"></v-btn>
                    <v-btn type="submit" :icon="mdiCheck" variant="text"></v-btn>
                    <template #extension>
                        <v-tabs v-model="selectedWindowItem" color="secondary" grow>
                            <v-tab v-for="(item, index) in windowItems" :rounded="true" :key="index">
                                <v-icon :icon="mdiCog"></v-icon>
                                &nbsp;{{ item }}
                            </v-tab>
                        </v-tabs>
                    </template>
                </v-toolbar>
                <v-card-text>
                    <v-window v-model="selectedWindowItem">
                        <v-window-item value="用户信息">
                            <v-row class="mt-2">
                                <v-col cols="12" md="6">
                                    <v-text-field label="用户名" v-model="createForm.userName" color="primary"
                                        variant="outlined" density="compact" type="text" placeholder="登录用户名"
                                        :rules="createFormRules.userName">
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field label="姓名" v-model="createForm.name" color="primary" variant="outlined"
                                        density="compact" type="text" placeholder="用户姓名" :rules="createFormRules.name">
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field label="昵称" v-model="createForm.surname" color="primary" variant="outlined"
                                        density="compact" type="text" placeholder="用户昵称" :rules="createFormRules.surname">
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field label="邮箱" v-model="createForm.email" color="primary" variant="outlined"
                                        density="compact" type="email" placeholder="用户邮箱" :rules="createFormRules.email">
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field label="手机号" v-model="createForm.phoneNumber" color="primary"
                                        variant="outlined" density="compact" type="text" placeholder="用户手机号"
                                        :rules="createFormRules.phoneNumber">
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field label="账户密码" v-model="createForm.password" autocomplete="off"
                                        density="compact" color="primary" variant="outlined"
                                        :type="passwordShow ? 'text' : 'password'" placeholder="输入登录账户时的密码"
                                        :append-inner-icon="passwordShow ? mdiEye : mdiEyeOff"
                                        @click:append-inner="passwordShow = !passwordShow"
                                        :rules="createFormRules.password">
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-checkbox color="primary" density="compact" v-model="createForm.isActive" hide-details
                                        label="用户是否激活">
                                    </v-checkbox>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-checkbox color="primary" density="compact" v-model="createForm.lockoutEnabled"
                                        hide-details label="登录失败,账户被锁定">
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                        </v-window-item>
                        <v-window-item value="角色信息">
                            <v-row class="mt-2">
                                <v-select v-model="createForm.roleNames" :items="roleList" label="选择角色" variant="outlined"
                                    multiple class="ma-3">
                                </v-select>
                            </v-row>
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script setup lang="ts">
import { SubmitEventPromise } from 'vuetify';
import { useCreateIdentityUserForm } from '../hooks/createIdentityUser';
import { useThemeStore } from '@/store/themeStore';
import { mdiPower, mdiCheck, mdiCog, mdiEye, mdiEyeOff } from '@mdi/js';
const {
    createForm,
    createFormRules,
    createFormValid,
    roleList,
    fetchRoles,
    submitCreateIdentityUser } = useCreateIdentityUserForm();
const createFormRef = ref();
const themeStore = useThemeStore();
const selectedWindowItem = ref("用户信息");
const windowItems = ref(["用户信息", "角色信息"]);
const passwordShow = ref(false);

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    }
})

const emits = defineEmits(["update:show", "done"]);

const closeDialog = () => {
    emits("update:show", false);
}

const onSubmitCreateIdentityUser = async (e: SubmitEventPromise) => {
    createFormValid.value = (await e).valid;
    if (createFormValid.value) {
        const created = await submitCreateIdentityUser();
        emits("done", created, "create");
        emits("update:show", false);
    }
}

watch(() => props.show, async (newVal) => {
    if (newVal === true) {
        await fetchRoles();
    }
});
</script>

<style scoped></style>