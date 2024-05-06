<template>
   <v-dialog transition="dialog-top-transition" :fullscreen="themeStore.mobile" :width="themeStore.mobile ? '100%' : '50%'"
      :model-value="show" :persistent="true" :scrollable="true">
      <v-form v-model="updateFormValid" ref="updateFormRef" @submit.prevent="onSubmitUpdateIdentityUser">
         <v-card>
            <v-toolbar :color="themeStore.toolbarBgColor" extended>
               <v-toolbar-title>
                  更新用户信息
               </v-toolbar-title>
               <v-spacer></v-spacer>
               <v-btn :icon="mdiPower" @click="closeDialog"></v-btn>
               <v-btn type="submit" :icon="mdiCheck" variant="text"></v-btn>
               <template #extension>
                  <v-tabs v-model="selectedWindowItem" color="secondary" grow>
                     <v-tab v-for="(item, index) in windowItems" :key="index">
                        <v-icon :icon="mdiCog"></v-icon>
                        &nbsp;{{ item }}
                     </v-tab>
                  </v-tabs>
               </template>
            </v-toolbar>
            <v-card-text>
               <v-window v-model="selectedWindowItem">
                  <v-window-item value="用户信息">
                     <v-row class="mt-2">
                        <v-col cols="12" md="6">
                           <v-text-field label="用户名" v-model="updateForm.userName" color="primary" variant="outlined"
                              density="compact" type="text" placeholder="登录用户名" :rules="updateFormRules.userName">
                           </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                           <v-text-field label="姓名" v-model="updateForm.name" color="primary" variant="outlined"
                              density="compact" type="text" placeholder="用户姓名" :rules="updateFormRules.name">
                           </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                           <v-text-field label="昵称" v-model="updateForm.surname" color="primary" variant="outlined"
                              density="compact" type="text" placeholder="用户昵称" :rules="updateFormRules.surname">
                           </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                           <v-text-field label="邮箱" v-model="updateForm.email" color="primary" variant="outlined"
                              density="compact" type="email" placeholder="用户邮箱" :rules="updateFormRules.email">
                           </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                           <v-text-field label="手机号" v-model="updateForm.phoneNumber" color="primary" variant="outlined"
                              density="compact" type="text" placeholder="用户手机号" :rules="updateFormRules.phoneNumber">
                           </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                           <v-text-field label="更新密码" v-model="updateForm.password" autocomplete="off" density="compact"
                              color="primary" variant="outlined" :type="passwordShow ? 'text' : 'password'"
                              placeholder="输入新密码(如需变更)" :append-inner-icon="passwordShow ? mdiEye : mdiEyeOff"
                              @click:append-inner="passwordShow = !passwordShow" :rules="updateFormRules.password">
                           </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                           <v-checkbox color="primary" density="compact" v-model="updateForm.isActive" label="用户是否激活">
                           </v-checkbox>
                        </v-col>

                        <v-col cols="12" md="6" v-if="!isEditCurrentUser">
                           <v-checkbox color="primary" density="compact" v-model="updateForm.lockoutEnabled"
                              label="登录失败,账户被锁定">
                           </v-checkbox>
                        </v-col>
                     </v-row>
                  </v-window-item>
                  <v-window-item value="角色信息">
                     <v-row class="mt-2">
                        <v-select v-model="updateForm.roleNames" :items="roleList" label="选择角色" variant="outlined" multiple
                           class="ma-3">
                        </v-select>
                     </v-row>
                  </v-window-item>
               </v-window>
            </v-card-text>
         </v-card>
      </v-form>
   </v-dialog>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/themeStore';
import { useUpdateIdentityUserForm } from '../hooks/updateIdentityUser';
import { SubmitEventPromise } from 'vuetify';
import { mdiPower, mdiCheck, mdiCog, mdiEye, mdiEyeOff } from '@mdi/js';
const { updateFormValid,
   updateForm,
   updateFormRules,
   roleList,
   fetchUserInfo,
   submitUpdateIdentityUser } = useUpdateIdentityUserForm();
const updateFormRef = ref();
const themeStore = useThemeStore();
const selectedWindowItem = ref("用户信息");
const windowItems = ref(["用户信息", "角色信息"]);
const passwordShow = ref(false);
const isEditCurrentUser = ref(false);
const props = defineProps({
   show: {
      type: Boolean,
      required: true
   },
   userId: {
      type: String,
      required: true
   }
});

const emits = defineEmits(["update:show", "done"]);

const closeDialog = () => {
   emits("update:show", false)
}

const onSubmitUpdateIdentityUser = async (e: SubmitEventPromise) => {
   updateFormValid.value = (await e).valid;
   if (updateFormValid.value) {
      const edited = await submitUpdateIdentityUser();
      emits("done", edited, "edit");
      emits("update:show", false);
   }
}

watch(() => props.show, async (newVal) => {
   if (newVal === true) {
      await fetchUserInfo(props.userId);
   }
})
</script>

<style scoped></style>