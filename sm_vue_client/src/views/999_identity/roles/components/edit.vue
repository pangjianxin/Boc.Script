<template>
    <v-dialog transition="dialog-top-transition" :fullscreen="themeStore.mobile"
        :width="themeStore.mobile ? '100%' : '50%'" :model-value="show" :persistent="true" :scrollable="true">
        <v-form v-model="updateFormValid" ref="updateFormRef" @submit.prevent="onSubmitUpdateIdentityRole">
            <v-card>
                <v-toolbar :color="themeStore.toolbarBgColor">
                    <v-toolbar-title>
                        更新角色信息
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn :icon="mdiPower" variant="text" @click="closeDialog"></v-btn>
                    <v-btn type="submit" :icon="mdiCheck" variant="text"></v-btn>
                </v-toolbar>

                <v-card-text>
                    <v-row class="mt-1" no-gutters>
                        <v-col cols="12">
                            <v-text-field label="角色名称" v-model="updateForm.name" color="primary" variant="outlined"
                                density="compact" type="text" :rules="updateFormRules.name">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-checkbox color="primary" density="compact" v-model="updateForm.isDefault" label="是否默认"
                                :rules="updateFormRules.isDefault">
                            </v-checkbox>
                        </v-col>

                        <v-col cols="12">
                            <v-checkbox color="primary" density="compact" v-model="updateForm.isPublic" label="是否公开"
                                :rules="updateFormRules.isPublic">
                            </v-checkbox>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script setup lang="ts">
import { SubmitEventPromise } from 'vuetify';
import { useThemeStore } from '@/store/themeStore';
import { useUpdateIdentityRoleForm } from '../hooks/updateIdentityRole';
import { SystemClient } from '@/openapi/system';
import { OpenAPI } from '@/openapi/system/core/OpenAPI';
import { mdiPower, mdiCheck } from '@mdi/js';
const systemClient = new SystemClient(OpenAPI);
const { updateForm,
    updateFormValid,
    updateFormRules,
    initForm,
    submitUpdateIdentityRole, } = useUpdateIdentityRoleForm();
const updateFormRef = ref();
const themeStore = useThemeStore();
const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    roleId: {
        type: String,
        required: false
    }
})

const emits = defineEmits(["update:show", "done"]);

const closeDialog = () => {
    emits("update:show", false);
}

watch(() => props.show, async (newVal) => {
    if (newVal === true) {
        const res = await systemClient.role.roleGet({ id: props.roleId! });
        initForm(res);
    }
});

const onSubmitUpdateIdentityRole = async (e: SubmitEventPromise) => {
    updateFormValid.value = (await e).valid;
    if (updateFormValid.value) {
        const edited = await submitUpdateIdentityRole();
        emits("done", edited, "edit");
        emits("update:show", false);
    }
}
</script>

<style scoped></style>