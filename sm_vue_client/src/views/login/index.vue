<template>
    <v-container fluid class="h-100">
        <v-row no-gutters justify="center" align="center" class="h-100">
            <v-col lg="6" md="12">
                <v-card rounded="10">
                    <v-toolbar :image="headerBg">
                        <template #prepend>
                            <v-img inline width="28" :src="logo"></v-img>
                        </template>
                        <template #title>
                            <div class="d-flex flex-row align-center">
                                <span v-if="!themeStore.mobile" class="text-h5 font-weight-bold">
                                    用户登录
                                </span>
                                <span v-else class="text-subtitle-1 font-weight-bold">
                                    用户登录
                                </span>
                            </div>
                        </template>
                        <template v-slot:image>
                            <v-img gradient="to top right, rgba(83, 99, 255,.8), rgba(128, 128, 255,.8)"></v-img>
                        </template>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-row align="center">
                        <v-col cols="6" v-if="!themeStore.mobile">
                            <v-img :src="loginLeft" cover class="ma-1">
                                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                                    <h1 class="text-h4 font-weight-thin mb-4">
                                        {{ appName }}
                                    </h1>
                                    <h4 class="subheading">
                                        {{ appEngName }}
                                    </h4>
                                </div>
                            </v-img>
                        </v-col>
                        <v-col>
                            <passwordLogin :user-name="passwordLoginUserName" @update:notify="onPasswordLogin">
                            </passwordLogin>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
import loginLeft from '@/assets/login-left.png';
import logo from '@/assets/logo.png';
import headerBg from "@/assets/header-bg.jpg";
import passwordLogin from './components/passwordLogin.vue';
import { useThemeStore } from '@/store/themeStore';
import router from '@/router';
const appName = import.meta.env["VITE_APP_NAME"];
const appEngName = import.meta.env["VITE_APP_ENG_NAME"];
const themeStore = useThemeStore();
const passwordLoginUserName = ref<string | undefined>(undefined);

const onPasswordLogin = async (e: boolean) => {
    console.log(e);
    if (e === true)
        await router.push({ name: "index" });
}

</script>
<style lang="scss" scoped></style>
<route lang="yaml">
name: login
meta: 
  title: 登录
  desc: 系统功能
  icon: $mdiLogin
  visible: false
  auth: true
  layout: empty
</route>