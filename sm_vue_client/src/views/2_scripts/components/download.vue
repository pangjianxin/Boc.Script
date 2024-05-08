<template>
    <v-dialog :model-value="modelValue" @update:model-value="e => emits('update:modelValue', e)" width="350">
        <v-form v-model="formValid" ref="formRef" @submit.prevent="onSubmit">
            <v-card>
                <v-toolbar :color="themeStore.toolbarBgColor">
                    <template v-slot:prepend>
                        <v-btn icon="$menu"></v-btn>
                    </template>
                    <v-toolbar-title class="text-h6">
                        下载脚本
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-row class="mt-1">
                        <v-col cols="12" v-for="(value, key) in form.parameters" :key="key">
                            <v-text-field :label="key" v-model="form.parameters![key]" color="primary"
                                variant="outlined" density="compact" type="text" :rules="formRules.item">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn density="compact" variant="text" @click="emits('update:modelValue', false)"
                        :icon="mdiPower">
                    </v-btn>
                    <v-btn type="submit" :prepend-icon="mdiCheck" variant="text" :disabled="!formValid"
                        :loading="formLoading">
                        提交
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script setup lang="ts">
import { SubmitEventPromise } from 'vuetify';
import { useThemeStore } from '@/store/themeStore';
import { mdiPower, mdiCheck } from '@mdi/js';
import { useDownloadForm } from '../hooks/download';

const { form, formLoading, formValid, formRef, formRules, updateFormItems, submit } = useDownloadForm();
const themeStore = useThemeStore();

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: false,
        default: false
    },
    id: {
        type: String,
        required: false,
        default: undefined
    },
    parameters: {
        type: Array<string>,
        required: false,
        default: undefined
    }
});
const emits = defineEmits(["update:modelValue"]);

watch(() => props.modelValue, (val) => {
    if (val) {
        updateFormItems(props.parameters, props.id);
    }
});
const onSubmit = async (e: SubmitEventPromise) => {
    if ((await e).valid) {
        try {
            formLoading.value = true;
            await submit();
            emits('update:modelValue', false);
        } finally {
            formLoading.value = false;
        }
    }
}
</script>

<style scoped></style>