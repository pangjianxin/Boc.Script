<template>
    <toolbar title="租户管理" v-model:search="pageable.filter">
        <template #action>
            <v-btn variant="text" :prepend-icon="mdiAccountPlus" @click="onCreate()">
                增加
            </v-btn>
        </template>
    </toolbar>
    <v-treeview :items="list" :load-children="fetchChildren" color="warning" density="compact" item-title="title"
        item-value="id" :open-strategy="'single'">
        <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children" :icon="mdiAccount">
            </v-icon>
        </template>
        <template #append="{ isActive, item }">
            <v-btn v-if="isActive" :prepend-icon="mdiPlusCircle" variant="elevated" size="small" color="primary"
                @click.prevent="onCreate(item.id)">
                增加类别
            </v-btn>
        </template>
    </v-treeview>
    <create v-model="createDialog" v-bind="createDialogParams" @update:notify="onDateChanged()"></create>
</template>

<script setup lang="ts">
import { useCategoryList } from './hooks/categoryList';
import { mdiAccount } from '@mdi/js';
import create from './components/create.vue';
import toolbar from '@/components/toolbar/index.vue';
import { mdiAccountPlus, mdiPlusCircle } from '@mdi/js';

const createDialog = ref(false);
const createDialogParams = reactive({
    parentId: undefined as string | undefined
});
const onCreate = (parentId: string | undefined = undefined) => {
    createDialogParams.parentId = parentId;
    createDialog.value = true;
};
const onDateChanged = async () => {
    pageable.pageNum = 1;
    await getList(undefined);
};

const { list, getList, pageable } = useCategoryList();

const fetchChildren = async (item: any) => {
    console.log("fetchChildren", item.id);
    const children = await getList(item.id);
    item.children = children;
}

onMounted(async () => {
    list.value = await getList(undefined);
})
</script>

<style scoped></style>
<route lang="yaml">
name: category.index
meta: 
  icon: $mdiHome
  visible: true
  auth: true
  title: 类别索引
  desc: 类别管理
  order: 0
</route>