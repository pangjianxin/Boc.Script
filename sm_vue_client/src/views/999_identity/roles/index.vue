<template>
  <v-container fluid>
    <v-toolbar :color="themeStore.toolbarBgColor" rounded>
      <v-toolbar-title v-if="!searchBarActivated">
        角色列表
      </v-toolbar-title>
      <v-scale-transition>
        <v-text-field v-if="searchBarActivated" placeholder="搜索...." variant="solo" density="compact" hide-details
          :append-inner-icon="mdiPower" v-model="filter" @click:append-inner="toggleSearchBar" class="ml-1 w-100">
        </v-text-field>
      </v-scale-transition>
      <v-spacer></v-spacer>
      <v-btn variant="text" :icon="mdiFeatureSearch" v-if="!searchBarActivated" @click="toggleSearchBar">
      </v-btn>
      <v-btn variant="text" :icon="mdiAccountPlus" @click="onCreateDialogActived"
        v-permission="'AbpIdentity.Roles.Create'">
      </v-btn>
    </v-toolbar>
    <v-infinite-scroll :items="list" @load="onLoad">
      <template v-for="(item, index) in list" :key="index">
        <v-list-item lines="three">
          <template #prepend>
            <v-avatar :image="roleItem"></v-avatar>
          </template>
          <template #title>
            <span class="text-h6 text-primary">{{ item.name }}</span>

          </template>
          <template #subtitle>
            <div class="d-flex flex-column justify-center">
              <span class="text-subtitle-1 text-medium-emphasis">
                该角色为
                <span class="text-red">{{ item.isPublic ? '公开' : '非公开' }}</span>
                角色
              </span>
              <span class="text-subtitle-2 text-disabled">
                <span class="txt-red">{{ item.isDefault ? '默认(创建用户时的自动指定)' : '非默认(需手动指定)' }}</span>
              </span>
            </div>
          </template>
          <template #append>
            <v-menu location="end">
              <template v-slot:activator="{ props }">
                <v-btn color="secondary" density="compact" variant="elevated" icon="$menu" v-bind="props">
                </v-btn>
              </template>
              <v-list density="compact" lines="one" nav>
                <v-list-item @click="onEditDialogActived(item.id!)" v-permission="'AbpIdentity.Roles.Update'">
                  <template #title>
                    更新
                  </template>
                  <template #prepend>
                    <v-icon color="primary" :icon="mdiCog"></v-icon>
                  </template>
                </v-list-item>
                <v-list-item @click="e => onPermissionDialogActived(item.name!, item.name!)"
                  v-permission="'AbpIdentity.Roles.ManagePermissions'">
                  <template #title>
                    权限
                  </template>
                  <template #prepend>
                    <v-icon color="secondary" :icon="mdiCog"></v-icon>
                  </template>
                </v-list-item>
                <v-list-item @click="e => onDeleteDialogActivated(item)" v-permission="'AbpIdentity.Roles.Delete'">
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
    <edit v-model:show="editDialog" :role-id="selectedRole" @done="onDataChanged"></edit>
    <create v-model:show="createDialog" @done="onDataChanged"></create>
    <remove v-model:show="deleteDialog" :role="deleteDialogParams" @done="onDataChanged"></remove>
    <permissionManagement v-model:show="permissionDialog" :provider-key="permissionDialogParams.providerKey"
      :provider-name="permissionDialogParams.providerName"
      :provider-key-display-name="permissionDialogParams.providerDiaplayName">
    </permissionManagement>
  </v-container>
</template>

<script setup lang="ts">
import { useIdentityRoleList } from "./hooks/identityRoleList";
import edit from "./components/edit.vue";
import create from './components/create.vue';
import remove from "./components/delete.vue";
import roleItem from '@/assets/role-item.png';
import permissionManagement from "../permissions/components/permissionManagement.vue";
import { VoloAbpIdentityIdentityRoleDto } from "@/openapi/system";
import { useThemeStore } from '@/store/themeStore';
import { mdiCog, mdiPower, mdiDelete, mdiFeatureSearch, mdiAccountPlus, mdiInformation } from '@mdi/js';
const themeStore = useThemeStore();

const { list, filter, onDataChanged, scrollList } = useIdentityRoleList();
const searchBarActivated = ref(false);
const selectedRole = ref("");
const editDialog = ref(false);
const createDialog = ref(false);
const permissionDialog = ref(false);
const permissionDialogParams = reactive({
  providerKey: "",
  providerName: "R",
  providerDiaplayName: ""
});

const deleteDialog = ref(false);
const deleteDialogParams = ref<VoloAbpIdentityIdentityRoleDto>();


const onDeleteDialogActivated = (role: VoloAbpIdentityIdentityRoleDto) => {
  deleteDialogParams.value = role;
  deleteDialog.value = true;
}

const toggleSearchBar = () => {
  searchBarActivated.value = !searchBarActivated.value;
  filter.value = "";
}

const onEditDialogActived = (roleId: string) => {
  selectedRole.value = roleId;
  editDialog.value = true;
}

const onCreateDialogActived = () => {
  createDialog.value = true;
}

const onPermissionDialogActived = (key: string, keyDisplayName: string, name: string = "R") => {
  permissionDialog.value = true;
  permissionDialogParams.providerKey = key;
  permissionDialogParams.providerDiaplayName = keyDisplayName;
  permissionDialogParams.providerName = name;
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
name: identity.role.index
meta: 
  title: 角色列表
  desc: 身份认证
  visible: true
  visibleOnBottom: false
  auth: true
  icon: $mdiAccountCog
  permissions: 
    - AbpIdentity.Roles
</route>