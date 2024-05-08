<template>
    <v-dialog transition="dialog-top-transition" :fullscreen="themeStore.mobile" :model-value="modelValue"
        :persistent="true" :scrollable="true" width="50%">
        <v-form v-model="formValid" ref="formRef" @submit.prevent="onSubmit">
            <v-card>
                <v-toolbar :color="themeStore.toolbarBgColor">
                    <template v-slot:prepend>
                        <v-btn icon="$menu"></v-btn>
                    </template>
                    <v-toolbar-title class="text-h6">
                        创建脚本
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-row class="mt-1">
                        <v-col cols="12">
                            <v-text-field label="脚本名称" v-model="form.title" color="primary" variant="outlined"
                                density="compact" type="text" :rules="formRules.title">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="脚本描述" v-model="form.description" color="primary" variant="outlined"
                                density="compact" type="text" :rules="formRules.description">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea label="脚本内容" v-model="form.content" color="primary" variant="outlined"
                                density="compact" type="text" :rules="formRules.content">
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn density="compact" variant="text" @click=" emits('update:modelValue', false)"
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
import { useThemeStore } from '@/store/themeStore';
import { useCreateScriptForm } from '../hooks/create';
import { SubmitEventPromise } from 'vuetify';
import { mdiPower, mdiCheck } from '@mdi/js';
const themeStore = useThemeStore();

const { form, formLoading, formRef, formRules, formValid, submit } = useCreateScriptForm();

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    categoryId: {
        type: String,
        required: false,
        default: undefined
    }
});

watch(() => props.modelValue, newVal => {
    if (newVal) {
        form.categoryId = props.categoryId;
    }
});

const emits = defineEmits(["update:modelValue", "update:notify"]);

const onSubmit = async (e: SubmitEventPromise) => {
    if ((await e).valid) {
        await submit();
        emits("update:notify", true);
        emits("update:modelValue", false);
    }
}

</script>

<style scoped></style>