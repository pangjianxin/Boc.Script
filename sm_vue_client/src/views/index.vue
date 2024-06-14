<template>
  <v-container fluid class="h-100">
    <v-img aspect-ratio="16/9" cover :src="indexImg" class="fill-height">
      <v-sheet class="bg-transparent d-flex flex-column justify-end fill-height w-100">
        <v-sheet height="250" class="bg-transparent d-flex flex-row justify-end align-start" style="padding-right: 100px;">
          <v-btn v-for="menu in menuItems" :key="menu.url" :prepend-icon="menu.icon" variant="text" class="mx-5"
            @click="onNavigation(menu.url)">
            {{ menu.text }}
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-img>
  </v-container>
</template>

<script setup lang="ts">
import indexImg from '@/assets/index-bg.jpg';

import { mdiWeb } from '@mdi/js';
const menuItems = [
  {
    text: "审计智能分析平台",
    url: "https://aiap.bocsys.cn/",
    icon: mdiWeb
  }, {
    text: "审计工作信息化平台",
    url: "https://awip.bocsys.cn/ ",
    icon: mdiWeb
  }, {
    text: "一体化监督管理平台",
    url: "https://p2.bocsys.cn/",
    icon: mdiWeb
  }, {
    text: "法规规章制度",
    url: "http://rrms.p.bocsys.cn/ksrr/login",
    icon: mdiWeb
  }, {
    text: "企业邮箱",
    url: "https://web.mail.bank-of-china.com/webmail/login/login.do ",
    icon: mdiWeb
  }
];

const onNavigation = (url: string) => {
  window.open(url, '_blank');
}
</script>

<style scoped></style>
<route lang="yaml">
name: index
meta: 
  icon: $mdiHome
  visible: true
  auth: true
  title: 系统首页
  desc: 系统管理
  order: 0
</route>