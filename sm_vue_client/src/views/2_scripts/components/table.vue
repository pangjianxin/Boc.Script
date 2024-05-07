<template>
    <v-data-table-server fixed-header v-model:items-per-page="pageable.pageSize" :headers="headers"
        :items-length="pageable.total" :items="list" :loading="loading" item-value="title"
        @update:options="onPageOptionUpdated" items-per-page-text="每页">
        <template #[`item.name`]="{ value }">
            <span class="text-caption">{{ value }}</span>
        </template>

        <template #[`item.title`]="{ value }">
            <span class="text-caption">{{ value }}</span>
        </template>

        <template #[`item.description`]="{ value }">
            <span class="text-caption">{{ value }}</span>
        </template>

        <template #[`item.content`]="{ value }">
            <v-sheet v-bind="props" class="text-caption text-truncate" style="max-width: 200px;">
                {{ value }}
            </v-sheet>
        </template>

        <template #[`item.actions`]="{ item }">
            <v-btn :prepend-icon="mdiFileEdit" variant="outlined" size="small" color="primary"
                @click="onUpdate(item.id!)">
                更新
            </v-btn>
            <v-btn :prepend-icon="mdiViewColumn" variant="outlined" size="small" color="success"
                @click="onPreview(item.content!)" class="ml-1">
                预览
            </v-btn>
            <v-btn :prepend-icon="mdiDownload" variant="outlined" size="small" color="success"
                @click="onDownload(item.id!)" class="ml-1">
                下载
            </v-btn>
        </template>

        <template #no-data>
            <v-empty-state :icon="mdiMagnify" title="您检索的条件没有结果" text="请重新换一个搜索关键字来搜索试试..">
            </v-empty-state>
        </template>
        <template #loading> 数据加载中,请稍后... </template>
    </v-data-table-server>
    <scriptPreviewer v-model="previewerDialog" v-bind="previewerDialogParams"></scriptPreviewer>
    <update v-model="updateDialog" v-bind="updateDialogParams" @update:notify="refreshData"></update>
    <download v-model="downloadDialog" v-bind="downloadDialogParams"></download>
</template>

<script setup lang="ts">
import { useScriptList } from '../hooks/scriptList';
import { mdiMagnify, mdiFileEdit, mdiDownload, mdiViewColumn } from '@mdi/js';
import scriptPreviewer from './previewer.vue';
import update from './update.vue';
import download from './download.vue';

const props = defineProps({
    categoryId: {
        type: String,
        required: false,
        default: undefined
    },
    filter: {
        type: String,
        required: false,
        default: undefined
    }
});

const updateDialog = ref(false);
const updateDialogParams = reactive({
    id: undefined as string | undefined
})
const onUpdate = (id: string) => {
    updateDialog.value = true;
    updateDialogParams.id = id;
}

const previewerDialog = ref(false);
const previewerDialogParams = reactive({
    content: undefined as string | undefined
});
const onPreview = (sql: string) => {
    previewerDialogParams.content = sql;
    previewerDialog.value = true;
};

const downloadDialog = ref(false);
const downloadDialogParams = reactive({
    id: undefined as string | undefined,
    parameters: undefined as string[] | undefined
});
const onDownload = async (id: string) => {
    const result = await resolveParameters(id);
    downloadDialogParams.parameters = result;
    downloadDialogParams.id = id;
    downloadDialog.value = true;
}

const { pageable, headers, getList, loading, list, onPageOptionUpdated, resolveParameters } = useScriptList();

const refreshData = async () => {
    pageable.pageNum = 1;
    await getList(props.categoryId);
}



watch(() => props.categoryId, async () => {
    await refreshData();
}, {
    immediate: true
});

watchDebounced(() => props.filter, async (newVal, oldVal) => {
    if (newVal != oldVal) {
        pageable.filter = newVal;
        await refreshData();
    }
}, {
    maxWait: 1000,
    debounce: 300
})
</script>

<style scoped></style>