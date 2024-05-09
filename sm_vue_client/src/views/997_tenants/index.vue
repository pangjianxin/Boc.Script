<template>
    <toolbar title="租户管理" v-model:search="filter">
        <template #action>
            <v-btn variant="text" :icon="mdiAccountPlus" @click="onCreateDialogActivated"
                v-permission="'AbpIdentity.Users.Create'">
            </v-btn>
        </template>
    </toolbar>
    <v-infinite-scroll :items="list" @load="onLoad">
        <template v-for="(item, index) in list" :key="index">
            <v-list-item lines="one">
                <template #prepend>
                    <v-avatar :image="roleItem"></v-avatar>
                </template>
                <template #title>
                    <span class="text-h6 text-primary">{{ item.name }}</span>
                </template>
                <template #append>
                    <v-menu location="end">
                        <template v-slot:activator="{ props }">
                            <v-btn color="secondary" variant="elevated" density="compact" icon="$menu" v-bind="props">
                            </v-btn>
                        </template>
                        <v-list density="compact" lines="one" nav>
                            <v-list-item @click="onEditDialogActived(item.id!)"
                                v-permission="'AbpIdentity.Users.Update'">
                                <template #title>
                                    更新
                                </template>
                                <template #prepend>
                                    <v-icon color="primary" :icon="mdiCog"></v-icon>
                                </template>
                            </v-list-item>
                            <v-list-item @click="onDeleteDialogActivated(item)"
                                v-permission="'AbpIdentity.Users.Delete'">
                                <template #title>
                                    删除
                                </template>
                                <template #prepend>
                                    <v-icon color="warning" :icon="mdiDelete"></v-icon>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
            </v-list-item>
        </template>
        <template #empty>
            <v-empty-state :icon="mdiMagnify" title="您检索的条件没有结果" text="请重新换一个搜索关键字来搜索试试..">
            </v-empty-state>
        </template>
    </v-infinite-scroll>

    <create v-model="createDialog" @done="onDataChanged"></create>
</template>

<script setup lang="ts">


import toolbar from '@/components/toolbar/index.vue';
import { mdiMagnify } from '@mdi/js';
import { VoloAbpTenantManagementTenantDto } from '@/openapi/system';
import create from '@/views/997_tenants/components/create.vue';
import { useTenantList } from '@/views/997_tenants/hooks/tenantList';
import roleItem from '@/assets/role-item.png';
import { mdiDelete, mdiCog, mdiAccountPlus } from '@mdi/js';

const {
    list,
    filter,
    scrollList,
    onDataChanged } = useTenantList();

//创建对话框状态
const createDialog = ref(false);
const onCreateDialogActivated = () => {
    createDialog.value = true;
}

//编辑对话框状态
const editDialog = ref(false);
const editDialogParams = ref<string>("");
const onEditDialogActived = (tenantId: string) => {
    editDialog.value = true;
    editDialogParams.value = tenantId;
}

//删除对话框状态
const deleteDialog = ref(false);
const deleteDialogParams = ref<VoloAbpTenantManagementTenantDto>();
const onDeleteDialogActivated = (input: VoloAbpTenantManagementTenantDto) => {
    deleteDialog.value = true;
    deleteDialogParams.value = input;
}

//infinite scroll load事件
const onLoad = async ({ side, done }: { side: 'end' | 'start' | 'both', done: (status: 'error' | 'loading' | 'empty' | 'ok') => void }) => {
    if (side === "end") {
        var rows = await scrollList(1);
        if (rows > 0) {
            done("ok");
        } else {
            done("empty");
        }
    }
}


</script>

<style scoped></style>

<route lang="yaml">
name: tenant.index
meta: 
  title: 租户列表
  desc: 租户管理
  icon: $mdiAccountMultiple
  visible: true
  visibleOnBottom: false
  auth: true
  permissions: 
    - AbpTenantManagement.Tenants
</route>