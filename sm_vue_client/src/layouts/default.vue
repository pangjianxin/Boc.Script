<template>
  <v-layout class="rounded rounded-md v-application" full-height>
    <leftSideMenu ref="leftSideMenuRef"></leftSideMenu>
    <!-- <rightSideMenu v-model="rightSideMenuModel"></rightSideMenu> -->
    <v-app-bar :color="themeStore.appBarBgColor" rounded elevation="1">
      <template v-if="!mobile">
        <!--面包屑-->
        <Breadcrumbs />
      </template>
      <!--mobile下的按钮-->
      <template v-if="mobile">
        <div class="head_logo ml-4 mr-1">
          <img :src="logo" height="40" />
        </div>
      </template>
      <v-app-bar-nav-icon @click="toggleLeftSideMenu()"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!-- <v-btn @click="toggleRightSideMenu()" variant="text" :icon="mdiCog" /> -->
      <!--搜索框-->
      <div v-if="!mobile" style="width: 220px" class="search_ip mr-2">
        <v-text-field rounded density="compact" variant="outlined" label="Search here" :prepend-inner-icon="mdiMagnify"
          single-line hide-details clearable>
        </v-text-field>
      </div>
      <!--右侧工具栏-->
      <div class="d-flex flex-row align-center">
        <v-btn @click="themeStore.toggleTheme" variant="text" :icon="themeIcon" />

        <v-btn variant="text" :append-icon="mdiChevronDown" class="mr-2">
          <v-avatar size="x-small" class="avatar mr-2">
            <v-img :src="wxtx" alt="wallee"></v-img>
          </v-avatar>
          <span v-if="!mobile">{{ abpSessionStore.currentUser?.name }}</span>
          <v-menu activator="parent">
            <v-list nav>
              <v-list-item title="我的账户" :prepend-icon="mdiAccountEdit" @click="gotoAccount" />
              <v-list-item title="退出登录" :prepend-icon="mdiLogin" to="/login" />
            </v-list>
          </v-menu>
        </v-btn>
      </div>
      <div style="position: fixed; right: 20px; bottom: 100px; z-index: 99999">
        <v-btn :icon="mdiCog" />
      </div>
    </v-app-bar>

    <v-main scrollable>
      <v-container :fluid="!themeStore.mobile">
        <router-view> </router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import { mdiCog, mdiChevronDown, mdiWeatherSunny, mdiWeatherNight, mdiAccountEdit, mdiLogin, mdiMagnify } from '@mdi/js';
import logo from "@/assets/logo.png";
import wxtx from "@/assets/user.png";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
import leftSideMenu from "@/layouts/components/leftSideMenu.vue";
import rightSideMenu from "./components/rightSideMenu.vue";
import { useThemeStore } from "@/store/themeStore";
import { useAbpSessionStore } from "@/store/abpSessionStore";

const abpSessionStore = useAbpSessionStore();
const themeStore = useThemeStore();
const router = useRouter();
const { theme, mobile } = storeToRefs(themeStore);
const themeIcon = computed(() => {
  return theme.value === "dark" ? mdiWeatherSunny : mdiWeatherNight;
});

const rightSideMenuModel = ref(false);
const toggleRightSideMenu = () => {
  rightSideMenuModel.value = !rightSideMenuModel.value;
};

const leftSideMenuRef = ref();
const toggleLeftSideMenu = () => {
  leftSideMenuRef.value.toggleCollapse();
};

const gotoAccount = async () => {
  await router.push({ name: "account" });
};

</script>
<style scoped lang="scss"></style>
