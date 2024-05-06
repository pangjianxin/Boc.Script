<template>
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
    height="250"
    rounded
    max-width="800"
    width="100%"
  >
    <div>
      <h2 class="text-h4 font-weight-black text-orange">{{ title }}</h2>

      <div class="text-h5 font-weight-medium mb-2">
        {{ subtitle }}
      </div>

      <p class="text-body-2 mb-4">
        {{ description }}
      </p>

      <v-btn variant="text" color="orange">重新登陆</v-btn>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
    default: "无数据返回",
  },
  subtitle: {
    type: String,
    required: false,
    default: "你的请求没有任何数据返回",
  },
  description: {
    type: String,
    required: false,
    default: "请更换检索条件或重新登陆后再次进行检索尝试",
  },
});
</script>

<style scoped></style>
