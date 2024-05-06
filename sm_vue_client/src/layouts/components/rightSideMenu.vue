<template>
    <v-navigation-drawer location="end" rounded elevation="1" :model-value="modelValue"
        @update:model-value="e => emits('update:modelValue', e)" width="200px" temporary>
        <v-list :bg-color="themeStore.appBarBgColor" nav>
            <v-list-item class="mx-1">
                <template #prepend>
                    <v-avatar :image="logo"></v-avatar>
                </template>
                <v-list-item-title class="title">{{ appName }}</v-list-item-title>
                <v-list-item-subtitle>{{ appEngName }}</v-list-item-subtitle>
            </v-list-item>
        </v-list>
        <v-card flat>
            <v-toolbar :color="themeStore.toolbarBgColor" density="compact" rounded>
                <v-toolbar-title>
                    <span class="text-subtitle-1">企业信息</span>
                </v-toolbar-title>
            </v-toolbar>
            <v-list density="compact">
                <v-list-item>
                    <template #prepend>
                        <v-avatar size="small" color="green" :icon="mdiPhone"></v-avatar>
                    </template>
                    <template #title>
                        <span class="font-weight-bold text-caption">联系电话</span>
                    </template>
                    <template #subtitle>
                        <span class="text-subtitle-2"> {{ contactPhone }}</span>
                    </template>
                    <template #append>
                        <v-btn variant="text" size="small" :icon="mdiClipboardArrowDownOutline"
                            @click="onClip(contactPhone)">
                        </v-btn>
                    </template>
                </v-list-item>
                <v-list-item>
                    <template #prepend>
                        <v-avatar size="small" color="green" :icon="mdiEmail"></v-avatar>
                    </template>
                    <template #title>
                        <span class="font-weight-bold text-caption">电子邮件</span>
                    </template>
                    <template #subtitle>
                        <span class="text-subtitle-2"> {{ email }}</span>
                    </template>
                    <template #append>
                        <v-btn variant="text" size="small" :icon="mdiClipboardArrowDownOutline"
                            @click="onClip(email)"></v-btn>
                    </template>
                </v-list-item>
                <v-list-item>
                    <template #prepend>
                        <v-avatar size="small" color="green" :icon="mdiAccountTie"></v-avatar>
                    </template>
                    <template #title>
                        <span class="font-weight-bold text-caption">作者信息</span>
                    </template>
                    <template #subtitle>
                        <span class="text-subtitle-2"> 内蒙古征信服务有限公司</span>
                    </template>
                    <template #append>
                        <v-btn variant="text" size="small" :icon="mdiClipboardArrowDownOutline">
                        </v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-card>

        <v-card flat>
            <v-toolbar :color="themeStore.toolbarBgColor" density="compact">
                <v-toolbar-title>
                    <span class="text-subtitle-1">顶部Appbar颜色</span>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-color-picker elevation="0" v-model="themeStore.appBarBgColor" :modes="['rgba']"></v-color-picker>
            </v-card-text>
        </v-card>

        <v-card flat>
            <v-toolbar :color="themeStore.toolbarBgColor" density="compact">
                <v-toolbar-title>
                    <span class="text-subtitle-1">系统Toolbar颜色</span>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-color-picker elevation="0" v-model="themeStore.toolbarBgColor" :modes="['rgba']"></v-color-picker>
            </v-card-text>
        </v-card>
    </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { useGlobalStore } from '@/store/globalStore';
import { useThemeStore } from '@/store/themeStore';
import logo from '@/assets/logo.png';
import { mdiPhone, mdiClipboardArrowDownOutline, mdiAccountTie, mdiEmail } from '@mdi/js';
const appName = import.meta.env["VITE_APP_NAME"];
const appEngName = import.meta.env["VITE_APP_ENG_NAME"];
const contactPhone = import.meta.env["VITE_CONTACT_PHONE"];
const email = import.meta.env["VITE_EMAIL"];

const clipBoard = useClipboard();
const themeStore = useThemeStore();

const onClip = async (val: string) => {
    await clipBoard.copy(val);
    useGlobalStore().setSnackbarText("复制成功");
}

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,

    }
})

const emits = defineEmits(["update:modelValue"]);

watch(() => props.modelValue, (val) => {
    console.log(val);
})

</script>