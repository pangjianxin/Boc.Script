<template>
    <v-form ref="formRef" v-model="formValid" @submit.prevent="onSubmit">
        <v-overlay contained v-model="initLoading" app class="justify-center align-center" persistent>
            <v-progress-circular indeterminate size="64" />
        </v-overlay>
        <v-card flat>
            <v-card-text>
                <v-row :no-gutters="false">
                    <v-col :cols="12" :md="6">
                        <v-text-field label="密码最小长度" v-model="form.requiredLength" color="primary" variant="outlined"
                            density="compact" type="number" placeholder="请输入密码最小长度" :rules="formRules.requiredLength"
                            :append-inner-icon="mdiIpNetworkOutline">
                        </v-text-field>
                    </v-col>
                    <v-col :cols="12" :md="6">
                        <v-text-field label="唯一字符的个数" v-model="form.requiredUniqueChars" color="primary"
                            variant="outlined" density="compact" type="text" placeholder="请输入唯一字符的个数"
                            :rules="formRules.requiredUniqueChars" :append-inner-icon="mdiApplicationOutline">
                        </v-text-field>
                    </v-col>
                    <v-col :cols="12" :md="6">
                        <v-switch v-model="form.requireNonAlphanumeric" color="deep-purple-accent-4">
                            <template v-slot:label>
                                {{ form.requireNonAlphanumeric ? '需要非字母数字字符(开启)' : '需要非字母和数字字符(关闭)' }}
                            </template>
                        </v-switch>
                    </v-col>
                    <v-col :cols="12" :md="6">
                        <v-switch v-model="form.requireUppercase" color="deep-purple-accent-4">
                            <template v-slot:label>
                                {{ form.requireUppercase ? '需要大写字母(开启)' : '需要大写字母(关闭)' }}
                            </template>
                        </v-switch>
                    </v-col>
                    <v-col :cols="12" :md="6">
                        <v-switch v-model="form.requireLowercase" color="deep-purple-accent-4">
                            <template v-slot:label>
                                {{ form.requireLowercase ? '需要小写字母(开启)' : '需要小写字母(关闭)' }}
                            </template>
                        </v-switch>
                    </v-col>
                    <v-col :cols="12" :md="6">
                        <v-switch v-model="form.requireDigit" color="deep-purple-accent-4">
                            <template v-slot:label>
                                {{ form.requireDigit ? '需要数字(开启)' : '需要数字(关闭)' }}
                            </template>
                        </v-switch>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="elevated" :prepend-icon="mdiRefresh" color="warning">
                    重置
                </v-btn>

                <v-btn type="submit" variant="elevated" :prepend-icon="mdiCheckDecagramOutline" color="primary"
                    :disabled="!formValid" :loading="formLoading">
                    提交
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/globalStore';
import { useIdentityPasswordOptionsSettingForm } from '@/views/999_identity/options/hooks/identityPasswordOptionsSetting';
import { SubmitEventPromise } from 'vuetify';
import { mdiRefresh, mdiCheckDecagramOutline, mdiIpNetworkOutline, mdiApplicationOutline } from '@mdi/js';

const { setSnackbarText } = useGlobalStore();
const { form, formRef, formRules, formLoading, formValid, initLoading, initState, submit } = useIdentityPasswordOptionsSettingForm();
const onSubmit = async (e: SubmitEventPromise) => {
    if ((await e).valid) {
        try {
            formLoading.value = true;
            await submit();
            setSnackbarText('保存成功');
        } finally {
            formLoading.value = false;
        }
    }
}

onMounted(async () => {
    await initState();
});
</script>

<style scoped></style>