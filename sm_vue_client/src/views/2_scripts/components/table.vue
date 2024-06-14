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
            <v-menu>
                <template #activator="{ props }">
                    <v-btn :prepend-icon="mdiMenu" v-bind="props" variant="outlined" size="small" color="primary">
                        操作
                    </v-btn>
                </template>
                <v-list density="compact" nav>
                    <v-list-item @click="onRemoveConfirmDialog(item.id!)">
                        <template #prepend>
                            <v-icon color="error" :icon="mdiDeleteAlert"></v-icon>
                        </template>
                        <template #title>
                            删除
                        </template>
                    </v-list-item>
                    <v-list-item @click="onUpdate(item.id!)">
                        <template #prepend>
                            <v-icon color="primary" :icon="mdiFileEdit"></v-icon>
                        </template>
                        <template #title>
                            更新
                        </template>
                    </v-list-item>
                    <v-list-item @click="onPreview(item.content!)">
                        <template #prepend>
                            <v-icon color="success" :icon="mdiViewColumn"></v-icon>
                        </template>
                        <template #title>
                            预览
                        </template>
                    </v-list-item>
                    <v-list-item @click="onCategory(item.id!)">
                        <template #prepend>
                            <v-icon color="info" :icon="mdiListBox"></v-icon>
                        </template>
                        <template #title>
                            类别信息
                        </template>
                    </v-list-item>
                    <v-list-item @click="onVersionView(item.id!)">
                        <template #prepend>
                            <v-icon color="info" :icon="mdiHistory"></v-icon>
                        </template>
                        <template #title>
                            变更历史
                        </template>
                    </v-list-item>
                </v-list>
            </v-menu>
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
    <script-versions v-model="versionDialog" v-bind="versionDialogParams"></script-versions>
    <category v-model="categoryDialog" v-bind="categoryDialogParams" @update:notify="refreshData"></category>
    <remove-confirm v-model="removeConfirmDialog" v-bind="removeConfirmDialogParams"
        @update:notify="onRemoveAttachmentConfirmed">
    </remove-confirm>
</template>

<script setup lang="ts">
import { useScriptList } from '../hooks/scriptList';
import { mdiMagnify, mdiFileEdit, mdiDownload, mdiViewColumn, mdiMenu, mdiHistory, mdiListBox, mdiDeleteAlert } from '@mdi/js';
import scriptPreviewer from './previewer.vue';
import update from './update.vue';
import download from './download.vue';
import scriptVersions from './versions.vue';
import category from './category.vue';
import removeConfirm from '@/components/confirmDialog/index.vue';
import { SystemClient } from '@/openapi/system';
import { OpenAPI } from '@/openapi/system/core/OpenAPI';
import { useGlobalStore } from '@/store/globalStore';

const { setSnackbarText } = useGlobalStore();

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
// 版本对话框
const versionDialog = ref(false);
const versionDialogParams = reactive({
    id: undefined as string | undefined
});
const onVersionView = (id: string) => {
    versionDialogParams.id = id;
    versionDialog.value = true;
}
// 更新对话框
const updateDialog = ref(false);
const updateDialogParams = reactive({
    id: undefined as string | undefined
})
const onUpdate = (id: string) => {
    updateDialog.value = true;
    updateDialogParams.id = id;
}
// 预览对话框
const previewerDialog = ref(false);
const previewerDialogParams = reactive({
    content: undefined as string | undefined
});
const onPreview = (sql: string) => {
    previewerDialogParams.content = sql;
    previewerDialog.value = true;
};
// 下载对话框
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
// 类别对话框
const categoryDialog = ref(false);
const categoryDialogParams = reactive({
    entityId: undefined as string | undefined
})
const onCategory = (entityId: string) => {
    categoryDialogParams.entityId = entityId;
    categoryDialog.value = true;
}

// 删除对话框
const removeConfirmDialog = ref(false);
const removeConfirmDialogParams = reactive({
    title: "确认删除？",
    subtitle: "您正在删除该脚本，该操作不可恢复",
    params: {} as Record<string, any> | undefined
});
const onRemoveConfirmDialog = (entityId: string) => {
    removeConfirmDialogParams.params = {};
    removeConfirmDialogParams.params['entityId'] = entityId;
    removeConfirmDialog.value = true;
};
const onRemoveAttachmentConfirmed = async (flag: boolean, params: Record<string, any>) => {
    if (flag === true) {
        const client = new SystemClient(OpenAPI);
        await client.script.scriptDelete({ id: params['entityId'] });
        setSnackbarText("删除成功", "success");
        await refreshData();
    } else {
        setSnackbarText("已取消删除", "error");
    }
};

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