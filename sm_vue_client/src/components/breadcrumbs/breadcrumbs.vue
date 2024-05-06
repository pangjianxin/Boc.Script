<template>
    <v-breadcrumbs :items="breadCrumbItems" divider="/">
        <template #prepend>
            <router-link to="/" class="link">
                <v-icon :icon="mdiHomeCircle"></v-icon>
            </router-link>
        </template>
        <template v-slot:divider>
            /
        </template>
    </v-breadcrumbs>
</template>
<script lang="ts" setup>
import { mdiHomeCircle } from '@mdi/js';
const route = useRoute();
let breadCrumbItems = ref();
function getBreadcrumbItems() {
    const { matched } = route as any;
    const last = matched[matched.length - 1];
    breadCrumbItems.value = [];
    breadCrumbItems.value.push({
        title: last.meta.desc,
        disabled: true,
        href: last.path,
    });
    breadCrumbItems.value.push({
        title: last.meta.title,
        disabled: false,
        href: last.path,
    });
}

watch(() => route, getBreadcrumbItems, { deep: true, immediate: true });
</script>
