<template>
    <toolbar title="脚本管理" v-model:search="scriptTableParams.filter" color="primary">
    </toolbar>
    <scriptTable v-bind="scriptTableParams"></scriptTable>
</template>

<script setup lang="ts">
import toolbar from '@/components/toolbar/index.vue';
import scriptTable from './components/table.vue';
const scriptTableParams = reactive({
    filter: undefined as string | undefined
});

</script>

<style scoped></style>
<route lang="yaml">
name: script.index
meta: 
  icon: $mdiScriptText
  visible: true
  auth: true
  title: 脚本索引
  desc: 脚本管理
  order: 0
</route>