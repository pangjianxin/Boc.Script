<template>
    <v-container fluid>
        <v-toolbar :color="themeStore.toolbarBgColor" rounded>
            <v-toolbar-title v-if="!searchBarActivated">
                用户列表
            </v-toolbar-title>
            <v-scale-transition>
                <v-text-field v-if="searchBarActivated" placeholder="搜索...." variant="solo" density="compact" hide-details
                    :append-inner-icon="mdiPower" v-model="filter" @click:append-inner="toggleSearchBar" class="ml-3 w-100">
                </v-text-field>
            </v-scale-transition>
            <v-spacer></v-spacer>
            <v-btn variant="text" :icon="mdiFeatureSearch" v-if="!searchBarActivated"
                @click="searchBarActivated = !searchBarActivated">
            </v-btn>

            <v-btn variant="text" :icon="mdiAccountPlus" @click="onCreateDialogActivated"
                v-permission="'AbpIdentity.Users.Create'">
            </v-btn>
        </v-toolbar>
        <v-infinite-scroll :items="list" @load="onLoad">
            <template v-for="(item, index) in list" :key="index">
                <v-list-item lines="three">
                    <template #prepend>
                        <v-avatar :image="userItem"></v-avatar>
                    </template>
                    <template #title>
                        <span class="text-h6 text-primary">{{ item.userName }}</span>
                    </template>
                    <template #subtitle>
                        <div class="d-flex flex-column justify-center">
                            <span class="text-subtitle-1 text-medium-emphasis">{{ item.name }}</span>
                            <span class="text-subtitle-2 text-disabled">{{ item.email }}</span>
                        </div>
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
                                <v-list-item @click="onPermissionDialogActived(item.id!, item.userName!)"
                                    v-permission="'AbpIdentity.Users.ManagePermissions'">
                                    <template #title>
                                        权限
                                    </template>
                                    <template #prepend>
                                        <v-icon color="secondary" :icon="mdiAccountCircle"></v-icon>
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
                <v-alert :icon="mdiInformation">
                    已到最底部,没有更多数据了....
                </v-alert>
            </template>
        </v-infinite-scroll>

        <edit v-model="editDialog" :user-id="editDialogPrarms" @done="onDataChanged"></edit>

        <remove v-model="deleteDialog" :user="deleteDialogParams!" @done="onDataChanged"></remove>

        <create v-model="createDialog" @done="onDataChanged"></create>

        <permissionManagement v-model="permissionDialog" :provider-key="permissionDialogParams.providerKey"
            :provider-name="permissionDialogParams.providerName"
            :provider-key-display-name="permissionDialogParams.providerDiaplayName">
        </permissionManagement>

    </v-container>
</template>

<script setup lang="ts">
import create from "./components/create.vue";
import { useIdentityUserList } from '@/views/999_identity/users/hooks/identityUserList';
import edit from "@/views/999_identity/users/components/edit.vue";
import remove from '@/views/999_identity/users/components/delete.vue';
import userItem from '@/assets/user-item.png';
import permissionManagement from "../permissions/components/permissionManagement.vue";
import { VoloAbpIdentityIdentityUserDto } from "@/openapi/system";
import { useThemeStore } from '@/store/themeStore';
import { mdiFeatureSearch, mdiAccountPlus, mdiPower, mdiInformation, mdiAccountCircle, mdiCog, mdiDelete } from '@mdi/js';
const themeStore = useThemeStore();

const { filter, onDataChanged, list, scrollList, } = useIdentityUserList();

//搜索框
const searchBarActivated = ref(false);
const toggleSearchBar = () => {
    searchBarActivated.value = !searchBarActivated.value;
    filter.value = "";
}

//创建用户对话框   
const createDialog = ref(false);
const onCreateDialogActivated = () => {
    createDialog.value = true;
}

//删除用户对话框
const deleteDialog = ref(false);
const deleteDialogParams = ref<VoloAbpIdentityIdentityUserDto>();

//编辑用户对话框
const editDialog = ref(false);
const editDialogPrarms = ref<string>("");

//用户权限编辑对话框
const permissionDialog = ref(false);
const permissionDialogParams = reactive({
    providerKey: "",
    providerName: "U",
    providerDiaplayName: ""
});

const onPermissionDialogActived = (key: string, keyDisplayName: string, name: string = "U") => {
    permissionDialog.value = true;
    permissionDialogParams.providerKey = key;
    permissionDialogParams.providerDiaplayName = keyDisplayName;
    permissionDialogParams.providerName = name;
}

const onEditDialogActived = (userId: string) => {
    editDialogPrarms.value = userId;
    editDialog.value = true;
}

const onDeleteDialogActivated = (user: VoloAbpIdentityIdentityUserDto) => {
    deleteDialogParams.value = user;
    deleteDialog.value = true;
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
name: identity.user.index
meta: 
  title: 用户列表
  desc: 身份认证
  visible: true
  visibleOnBottom: false
  auth: true
  icon: $mdiAccountTie
  permissions:
    - AbpIdentity.Users
</route>