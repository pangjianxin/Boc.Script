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
                            <v-btn v-if="isActive" :prepend-icon="mdiPlusCircle" variant="text" size="small"
                                color="primary" @click.prevent="onCreate(item.id)">
                                子类
                            </v-btn>
                            <v-btn v-if="isActive" :prepend-icon="mdiTagEdit" variant="text" size="small"
                                color="warning" class="ml-2" @click.prevent="onUpdate(item.id)">
                                编辑
                            </v-btn>
                            <v-btn v-if="isActive" :prepend-icon="mdiScriptText" variant="text" size="small"
                                color="success" class="ml-2" @click.prevent="onCreateScript(item.id)">
                                脚本
                            </v-btn>
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
</template>

<script setup lang="ts">
import { useCategoryList } from './hooks/categoryList';
import create from './components/create.vue';
import update from './components/update.vue';
import createScript from '@/views/2_scripts/components/create.vue';
import scriptTable from '@/views/2_scripts/components/table.vue';
import toolbar from '@/components/toolbar/index.vue';
import { mdiPlusCircle, mdiTagEdit, mdiScriptText, mdiFolderAccountOutline, mdiFileDocument } from '@mdi/js';
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
})
const onDateChanged = async () => {
    pageable.pageNum = 1;
    await getList(undefined);
};

const { list, getList, pageable } = useCategoryList();

const onActivated = (e: any[]) => {
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