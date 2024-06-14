<template>
    <v-row>
        <v-col :cols="4" :md="3" :sm="12">
            <v-card min-height="600" class="overflow-y-auto">
                <toolbar title="类别信息" color="primary">
                    <template #action>
                        <v-btn variant="text" :prepend-icon="mdiPlusCircle" @click="onCreate()">
                            根类别
                        </v-btn>
                    </template>
                </toolbar>
                <v-card-text>
                    <v-treeview color="primary" activatable :items="list" density="compact" item-title="title"
                        item-value="id" :open-strategy="'single'" @update:opened="onActivated">
                        <template v-slot:prepend="{ item }">
                            <v-icon
                                :icon="item.children && item.children.length > 0 ? mdiFolderAccountOutline : mdiFileDocument">
                            </v-icon>
                        </template>
                        <template #append="{ isActive, item }">
                            <v-menu v-if="isActive">
                                <template #activator="{ props }">
                                    <v-btn :icon="mdiMenu" v-bind="props" size="small" variant="text"></v-btn>
                                </template>
                                <v-list nav density="compact">
                                    <v-list-item @click.prevent="onCreate(item.id)">
                                        <template #prepend>
                                            <v-icon color="success" :icon="mdiPlusCircle"></v-icon>
                                        </template>
                                        <template #title>子类</template>
                                    </v-list-item>

                                    <v-list-item @click.prevent="onUpdate(item.id)">
                                        <template #prepend>
                                            <v-icon color="primary" :icon="mdiTagEdit"></v-icon>
                                        </template>
                                        <template #title>编辑</template>
                                    </v-list-item>

                                    <v-list-item @click.prevent="onRemoveConfirmDialog(item.id!)">
                                        <template #prepend>
                                            <v-icon color="error" :icon="mdiDeleteAlert"></v-icon>
                                        </template>
                                        <template #title>删除</template>
                                    </v-list-item>

                                    <v-list-item @click.prevent="onCreateScript(item.id)">
                                        <template #prepend>
                                            <v-icon color="info" :icon="mdiScriptText"></v-icon>
                                        </template>
                                        <template #title>脚本</template>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>
                    </v-treeview>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col :cols="8" :md="9" :sm="12">
            <v-card min-height="600" class="overflow-y-auto">
                <toolbar title="脚本列表" v-model:search="scriptTableParams.filter" color="secondary">
                </toolbar>
                <v-card-text>
                    <script-table v-bind="scriptTableParams"></script-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

    <create v-model="createDialog" v-bind="createDialogParams" @update:notify="onDateChanged()"></create>

    <update v-model="updateDialog" v-bind="updateDialogParams" @update:notify="onDateChanged()"></update>

    <create-script v-model="createScriptDialog" v-bind="createScriptDialogParams"></create-script>

    <remove-confirm v-model="removeConfirmDialog" v-bind="removeConfirmDialogParams"
        @update:notify="onRemoveAttachmentConfirmed">
    </remove-confirm>
</template>

<script setup lang="ts">
import { useCategoryList } from './hooks/categoryList';
import create from './components/create.vue';
import update from './components/update.vue';
import createScript from '@/views/2_scripts/components/create.vue';
import scriptTable from '@/views/2_scripts/components/table.vue';
import toolbar from '@/components/toolbar/index.vue';
import { mdiPlusCircle, mdiTagEdit, mdiScriptText, mdiFolderAccountOutline, mdiFileDocument, mdiMenu, mdiDeleteAlert } from '@mdi/js';
import removeConfirm from '@/components/confirmDialog/index.vue';
import { SystemClient } from '@/openapi/system';
import { OpenAPI } from '@/openapi/system/core/OpenAPI';
import { useGlobalStore } from '@/store/globalStore';


const { setSnackbarText } = useGlobalStore();
const createDialog = ref(false);
const createDialogParams = reactive({
    parentId: undefined as string | undefined
});
const onCreate = (parentId: string | undefined = undefined) => {
    createDialogParams.parentId = parentId;
    createDialog.value = true;
};

const updateDialog = ref(false);
const updateDialogParams = reactive({
    id: undefined as string | undefined,
});
const onUpdate = (id: string | undefined) => {
    updateDialogParams.id = id;
    updateDialog.value = true;
};

const createScriptDialog = ref(false);
const createScriptDialogParams = reactive({
    categoryId: undefined as string | undefined,
});
const onCreateScript = (categoryId: string | undefined) => {
    createScriptDialogParams.categoryId = categoryId;
    createScriptDialog.value = true;
};

const scriptTableParams = reactive({
    categoryId: undefined as string | undefined,
    filter: undefined as string | undefined
});

const removeConfirmDialog = ref(false);
const removeConfirmDialogParams = reactive({
    title: "确认删除？",
    subtitle: "您正在删除该类别，如果该类别下有脚本，则会转移至回收站",
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
        await client.category.categoryDelete({ id: params['entityId'] });
        setSnackbarText("删除成功", "success");
        await onDateChanged();
    } else {
        setSnackbarText("已取消删除", "error");
    }
};

const onDateChanged = async () => {
    pageable.pageNum = 1;
    await getList(undefined);
};

const { list, getList, pageable } = useCategoryList();

const onActivated = (e: any) => {
    scriptTableParams.categoryId = e[0];
}

onMounted(async () => {
    await getList(undefined);
})
</script>

<style scoped></style>
<route lang="yaml">
name: category.index
meta: 
  icon: $mdiListBox
  visible: true
  auth: true
  title: 类别索引
  desc: 类别管理
  order: 0
</route>