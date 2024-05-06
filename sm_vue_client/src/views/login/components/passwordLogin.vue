<template>
    <v-form ref="formRef" v-model="formValid" @submit.prevent="handleSubmit">
        <v-card flat>
            <template #text>
                <v-text-field label="用户名" placeholder="用户名一般是你的员工号" autocomplete="off" v-model="form.username"
                    :rules="rules.username" density="compact" variant="outlined" :append-inner-icon="mdiEmail">
                </v-text-field>
                <v-text-field type="password" placeholder="密码" autocomplete="off" label="密码" variant="outlined"
                    density="compact" v-model="form.password" :rules="rules.password" :append-inner-icon="mdiLock"
                    class="mt-5">
                </v-text-field>
                <v-row>
                    <v-col :cols="12">
                        <v-btn color="primary" density="comfortable" block :append-icon="mdiLogin" type="submit"
                            :loading="formLoading">
                            登录
                        </v-btn>
                    </v-col>
                    <v-col :cols="12">
                        <v-divider></v-divider>
                    </v-col>
                    <v-col :cols="12">
                        <v-btn color="success" variant="outlined" density="comfortable" block
                            :append-icon="mdiSetCenter" @click="oidcLogin">统一认证中心</v-btn>
                    </v-col>
                </v-row>
            </template>
        </v-card>
    </v-form>
</template>

<script setup lang="ts">
import { usePasswordLogin } from '../hooks/passwordLogin';
import { SubmitEventPromise } from 'vuetify';
import { userManager } from '@/utils/oidc-user-manager';
import { mdiLock, mdiEmail, mdiLogin, mdiSetCenter } from '@mdi/js';

const emits = defineEmits(["update:notify"]);
const { formRef, formValid, form, rules, submit, formLoading } = usePasswordLogin();
const handleSubmit = async (e: SubmitEventPromise) => {
    let res = await e;
    if (res.valid === true) {
        try {
            formLoading.value = true;
            await submit(form);
            emits("update:notify", true);
        } finally {
            formLoading.value = false;
        }
    }
}

const oidcLogin = async () => {
    await userManager.signinRedirect();
}

</script>

<style scoped></style>