<template>
    <v-dialog transition="dialog-top-transition" :fullscreen="themeStore.mobile" :model-value="modelValue"
        :persistent="true" :scrollable="true" :width="460">
        <v-form v-model="formValid" ref="formRef" @submit.prevent="onSubmit">
            <v-card>
                <v-toolbar :color="themeStore.toolbarBgColor">
                    <template v-slot:prepend>
                        <v-btn icon="$menu"></v-btn>
                    </template>
                    <v-toolbar-title class="text-h6">
                        创建类别
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-row class="mt-1">
                        <v-col cols="12">
                            <v-text-field label="类别名称" v-model="form.title" color="primary" variant="outlined"
                                density="compact" type="text" :rules="formRules.title">
                            </v-text-field>
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
import { useCreateCategoryForm } from '../hooks/create';
import { SubmitEventPromise } from 'vuetify';
import { mdiPower, mdiCheck } from '@mdi/js';
const themeStore = useThemeStore();

const { form, formLoading, formRef, formRules, formValid, submit } = useCreateCategoryForm();

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    parentId: {
        type: String,
        required: false,
        default: undefined
    }
});

watch(() => props.parentId, newVal => {
    form.parentId = newVal;
})

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