<template>
    <v-dialog transition="dialog-top-transition" :fullscreen="themeStore.mobile" :model-value="show" :persistent="true"
        :scrollable="true">
        <v-form v-model="createFormValid" ref="createFormRef" @submit.prevent="onSubmit">
            <v-card>
                <v-toolbar :color="themeStore.toolbarBgColor">
                    <template v-slot:prepend>
                        <v-btn icon="$menu"></v-btn>
                    </template>
                    <v-toolbar-title class="text-h6">
                        创建租户
                    </v-toolbar-title>
                    <template v-slot:append>
                        <v-btn color="white" density="compact" variant="text" @click="closeDialog" :icon="mdiPower">
                        </v-btn>
                        <v-btn color="white" type="submit" :icon="mdiCheck" variant="text" :disabled="!createFormValid">
                        </v-btn>
                    </template>
                </v-toolbar>
                <v-card-text>
                    <v-row class="mt-1">
                        <v-col cols="12" md="6">
                            <v-text-field label="租户名称" v-model="createForm.name" color="primary" variant="outlined"
                                density="compact" type="text" :rules="createFormRules.name">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="管理员密码" v-model="createForm.adminPassword" autocomplete="off"
                                density="compact" color="primary" variant="outlined"
                                :type="passwordShow ? 'text' : 'password'" placeholder="输入登录账户时的密码"
                                :append-inner-icon="passwordShow ? mdiEye : mdiEyeOff"
                                @click:append-inner="passwordShow = !passwordShow" :rules="createFormRules.adminPassword">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="管理员邮箱" v-model="createForm.adminEmailAddress" color="primary"
                                variant="outlined" density="compact" type="text" :rules="createFormRules.adminEmailAddress">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/themeStore';
import { useCreateTenantForm } from '@/views/997_tenants/hooks/createTenantForm';
import { SubmitEventPromise } from 'vuetify';
import { mdiPower, mdiEye, mdiEyeOff, mdiCheck } from '@mdi/js';
const themeStore = useThemeStore();

const { createFormValid, createForm, createFormRules, submit } = useCreateTenantForm();

const passwordShow = ref(false);

defineProps({
    show: {
        type: Boolean,
        required: true
    }
});

const emits = defineEmits(["update:modelValue", "done"]);

const onSubmit = async (e: SubmitEventPromise) => {
    createFormValid.value = (await e).valid;
    if (createFormValid.value) {
        const created = await submit();
        emits("done", created);
        emits("update:modelValue", false);
    }
}

const closeDialog = () => {
    emits("update:modelValue", false);
}
</script>

<style scoped></style>