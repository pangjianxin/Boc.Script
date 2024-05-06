<template>
  <v-toolbar :color="color" :height="height">
    <template v-if="!toolbarReversal">
      <v-app-bar-nav-icon :icon="mdiKeyboardBackspace" @click="router.back()"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="text-body-1">{{ title }}</span>
      </v-toolbar-title>
      <slot name="action">

      </slot>
      <v-btn :prepend-icon="mdiTextBoxSearchOutline" @click="toolbarReversal = true">搜索</v-btn>
    </template>
    <template v-else>
      <v-scale-transition :leave-absolute="true" mode="out-in">
        <v-text-field hide-details single-line variant="solo" density="compact" placeholder="输入内容检索"
          :model-value="search" @update:model-value="e => emits('update:search', e)" class="ma-2">
          <template #prepend-inner>
            <v-icon :icon="mdiTextBoxSearchOutline"></v-icon>
          </template>
          <template #append-inner>
            <v-icon :icon="mdiPower" @click.prevent="toolbarReversal = false"></v-icon>
          </template>
        </v-text-field>
      </v-scale-transition>
    </template>
  </v-toolbar>
</template>

<script setup lang="ts">
import { mdiKeyboardBackspace, mdiTextBoxSearchOutline, mdiPower } from '@mdi/js';

const router = useRouter();
const toolbarReversal = ref(false);

defineProps({
  color: {
    type: String,
    required: false,
    default: "transparent",
  },
  title: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: false,
    default: 48,
  },
  search: {
    type: String,
    required: false,
    default: undefined
  }
});

const emits = defineEmits(["update:search"]);

watch(() => toolbarReversal.value, (val) => {
  if (val === false) {
    emits('update:search', undefined)
  }
})

</script>

<style scoped></style>
