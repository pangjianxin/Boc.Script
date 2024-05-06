
<template>
    <v-dialog transition="dialog-top-transition" :fullscreen="themeStore.mobile" :width="themeStore.mobile ? '100%' : '50%'"
        :model-value="show" :persistent="true" :scrollable="true">
        <v-form v-model="createFormValid" ref="createFormRef" @submit.prevent="onSubmitCreateIdentityRole">
            <v-card>
                <v-toolbar :color="themeStore.toolbarBgColor">
                    <v-toolbar-title>
                        创建角色信息
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn :icon="mdiPower" variant="text" @click="closeDialog"></v-btn>
                    <v-btn type="submit" :icon="mdiCheck" variant="text"></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row class="mt-1" no-gutters>
                        <v-col cols="12">
                            <v-text-field label="角色名称" v-model="createForm.name" color="primary" variant="outlined"
                                density="compact" type="text" :rules="createFormRules.name">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-checkbox color="primary" density="compact" v-model="createForm.isDefault" label="是否默认"
                                :rules="createFormRules.isDefault">
                            </v-checkbox>
                        </v-col>

                        <v-col cols="12">
                            <v-checkbox color="primary" density="compact" v-model="createForm.isPublic" label="是否公开"
                                :rules="createFormRules.isPublic">
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
import { useCreateIdentityRoleForm } from '../hooks/createIdentityRole';
import { mdiPower, mdiCheck } from '@mdi/js';
const { createFormValid,
    createForm,
    createFormRules,
    submitCreateIdentityRole, } = useCreateIdentityRoleForm();
const createFormRef = ref();
const themeStore = useThemeStore();

defineProps({
    show: { type: Boolean, required: true }
})

const emits = defineEmits(["update:modelValue", "done"]);

const closeDialog = () => {
    emits("update:modelValue", false);
}



const onSubmitCreateIdentityRole = async (e: SubmitEventPromise) => {
    createFormValid.value = (await e).valid;
    if (createFormValid.value) {
        const created = await submitCreateIdentityRole();
        emits("done", created, "create");
        emits("update:modelValue", false);
    }

}
</script>

<style scoped></style>