<template>
    <v-dialog :model-value="modelValue" @update:model-value="e => emits('update:modelValue', e)">
        <v-sheet class="pa-4 text-center mx-auto" elevation="4" rounded>
            <v-icon class="mb-5" color="success" :icon="mdiCheckCircle" size="96"></v-icon>
            <h2 class="text-h5 mb-6">
                {{ title }}
            </h2>
            <div class="text-caption font-weight-medium mb-4">
                {{ subtitle }}
            </div>
            <v-divider class="mb-4"></v-divider>
            <div class="d-flex flex-row justify-end mt-3">
                <v-btn color="error" @click="onSubmit(false)">
                    取消
                </v-btn>
                <v-btn color="success" @click="onSubmit(true)" class="ml-3">
                    确认
                </v-btn>
            </div>
        </v-sheet>
    </v-dialog>
</template>

<script setup lang="ts">
import { mdiCheckCircle } from '@mdi/js';
import { PropType } from 'vue';
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    subtitle: {
        type: String,
        required: false
    },
    params: {
        type: Object as PropType<Record<string, any>>,
        required: false,
        default: undefined
    }
});

const emits = defineEmits(["update:modelValue", "update:notify"]);

const onSubmit = async (flag: boolean) => {
    emits('update:notify', flag, props.params);
    emits('update:modelValue', false);
};

</script>

<style scoped></style>