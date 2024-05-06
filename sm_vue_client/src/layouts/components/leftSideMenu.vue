<template>
    <v-navigation-drawer rounded elevation="1" :rail="rail" expand-on-hover :permanent="permanent"
        :temporary="temporary" v-model="sideMenuModel">
        <v-list :bg-color="themeStore.appBarBgColor" nav>
            <v-list-item :prepend-avatar="logo" class="mx-1">
                <v-list-item-title class="font-weight-bold">{{ appName }}</v-list-item-title>
                <v-list-item-subtitle>{{ appEngName }}</v-list-item-subtitle>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list :lines="false" density="compact" nav v-model:opened="menuOpened">
            <template v-for="(menuItem, index) in menus" :key="index">
                <template v-if="menuItem.length === 1">
                    <v-list-item :prepend-icon="menuItem[0].icon" :title="(menuItem[0].title as any)"
                        :to="{ name: menuItem[0].routeName }">
                    </v-list-item>
                </template>
                <template v-if="menuItem.length > 1">
                    <v-list-group :value="index">
                        <template v-slot:activator="{ props, isOpen }">
                            <v-list-item v-bind="props" :prepend-icon="isOpen ? mdiMenuClose : mdiMenuOpen">
                                <template #title>{{ index }}</template>
                            </v-list-item>
                        </template>
                        <template v-for="menu in menuItem" :key="menu.name">
                            <v-list-item :prepend-icon="menu.icon" :title="(menu.title as any)"
                                :to="{ name: menu.routeName }">
                            </v-list-item>
                        </template>
                    </v-list-group>
                </template>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>
<script lang="ts" setup>
import logo from '@/assets/logo.png';
import { useSideMenuStore } from '@/store/sideMenuStore';
import { useThemeStore } from '@/store/themeStore';
import { mdiMenuOpen, mdiMenuClose } from '@mdi/js';
import { routes } from "vue-router/auto-routes";
import { useAbpSessionStore } from "@/store/abpSessionStore";

const abpSessionStore = useAbpSessionStore();
const appName = import.meta.env.VITE_APP_NAME;
const appEngName = import.meta.env.VITE_APP_ENG_NAME;
const themeStore = useThemeStore();
const sideMenuStore = useSideMenuStore();
const { rail, sideMenuModel, permanent, temporary } = storeToRefs(sideMenuStore);
const menuOpened = ref([]);

const menus = computed(() => {
    let leftSideMenuList: Record<string, MenuInfo[]> = {};
    let grantedPermissions = abpSessionStore.auth?.grantedPolicies || [];
    let traverse = (route: any) => {
        if (route.children && route.children.length > 0) {
            route.children.forEach((child: any) => traverse(child));
        } else {
            if (route.meta?.visible === true) {
                if (!leftSideMenuList[route.meta.desc as string]) {
                    leftSideMenuList[route.meta.desc as string] = [];
                }
                if (
                    !route.meta?.permissions ||
                    route.meta?.permissions?.some(
                        (p: any) =>
                            (grantedPermissions as Record<string, boolean>)[p] === true
                    )
                ) {
                    leftSideMenuList[route.meta?.desc as string].push({
                        title: route.meta?.title as string,
                        routeName: route.name as string,
                        icon: route.meta?.icon as string,
                        path: route.path,
                    });
                }
            }
        }
    };
    routes.forEach((route) => traverse(route));
    return leftSideMenuList;
});

defineExpose({
    toggleCollapse: sideMenuStore.toggleCollapse
});

</script>