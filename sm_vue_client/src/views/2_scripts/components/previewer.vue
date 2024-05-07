<template>
    <v-dialog transition="dialog-top-transition" :fullscreen="themeStore.mobile" :model-value="modelValue"
        :persistent="true" :scrollable="true" width="60%">
        <v-card>
            <v-toolbar :color="themeStore.toolbarBgColor">
                <template v-slot:prepend>
                    <v-btn icon="$menu"></v-btn>
                </template>
                <v-toolbar-title class="text-h6">
                    脚本详情
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <highlightjs language="sql" :code="content!"></highlightjs>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="text" @click=" emits('update:modelValue', false)" :prepend-icon="mdiPower">
                    关闭
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/themeStore';
import { mdiPower } from '@mdi/js';
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import hljsVuePlugin from "@highlightjs/vue-plugin";
hljs.registerLanguage('sql', sql);
const highlightjs = hljsVuePlugin.component;
const themeStore = useThemeStore();

defineProps({
    modelValue: {
        type: Boolean,
        required: false,
    },
    content: {
        type: String,
        rquired: false,
        defalut: undefined
    }
});
const emits = defineEmits(["update:modelValue"]);
</script>

<style scoped></style>