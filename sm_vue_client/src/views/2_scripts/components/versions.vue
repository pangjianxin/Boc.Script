<template>
    <v-dialog :model-value="modelValue" @update:model-value="e => emits('update:modelValue', e)" width="auto"
        :scrollable="true">
        <v-card>
            <v-card-title>脚本:{{ script?.title }}</v-card-title>
            <v-card-text>
                <template v-if="script?.versions && script.versions.length > 0">
                    <template v-for="(item, index) in script?.versions" :key="index">
                        <v-alert :icon="mdiInformation">变更提交于{{ dayjs(item.creationTime).format("YYYY年MM月DD日")
                            }}</v-alert>
                        <highlightjs :language="'sql'" :code="item.content!">
                        </highlightjs>
                        <v-divider class="my-1" :thickness="3"></v-divider>
                    </template>
                </template>
                <template v-else>
                    <v-empty-state :icon="mdiMagnify" title="没有变更记录" text="当前脚本没有变更记录"></v-empty-state>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :prepend-icon="mdiPower" @click="emits('update:modelValue', false)">关闭</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { mdiPower, mdiInformation, mdiMagnify } from '@mdi/js';
import { BocSmScriptsDtosScriptDto, SystemClient } from '@/openapi/system';
import dayjs from 'dayjs';
import { OpenAPI } from '@/openapi/system/core/OpenAPI';
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import hljsVuePlugin from "@highlightjs/vue-plugin";
hljs.registerLanguage('sql', sql);
const highlightjs = hljsVuePlugin.component;

const script = ref<BocSmScriptsDtosScriptDto>();
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
    }
});

const emits = defineEmits(["update:modelValue"]);

watch(() => props.modelValue, async (newVal) => {
    if (newVal) {
        const client = new SystemClient(OpenAPI);
        script.value = await client.script.scriptGet({ id: props.id! });
    }
});
</script>

<style scoped></style>