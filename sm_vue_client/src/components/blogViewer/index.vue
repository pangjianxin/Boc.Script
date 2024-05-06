<template>
    <v-card>
        <v-toolbar :color="themeStore.toolbarBgColor" density="compact" rounded>
            <v-toolbar-title>
                <span class="text-h6 font-weight-bold">
                    博客列表
                </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-infinite-scroll :items="cachedList" :height="scrollHeight" @load="onLoad">
            <template v-for="(item, index) in cachedList" :key="index">
                <v-list-item lines="two">
                    <template #prepend>
                        <v-avatar :image="blogImg"></v-avatar>
                    </template>
                    <template #title>
                        <span class="text-body-1">{{ item.name }}</span>
                    </template>
                    <template #subtitle>
                        <span class="text-caption text-medium-emphasis">
                            {{ item.slug }}
                        </span>
                    </template>
                    <template #append>
                        <v-btn variant="text" :icon="mdiCog"></v-btn>
                    </template>
                </v-list-item>
            </template>
            <template #empty>
                <v-alert :icon="mdiInformation">
                    已到最底部,没有更多数据了....
                </v-alert>
            </template>
        </v-infinite-scroll>
    </v-card>
</template>

<script setup lang="ts">
import { ZxCmsCmsBlogPublicDto } from '@/openapi/cms';
import { useBlogList } from '@/views/cms/blogs/hooks/blogList';
import blogImg from '@/assets/blog.png';
import { useThemeStore } from '@/store/themeStore';
import { mdiInformation, mdiCog } from '@mdi/js';
const themeStore = useThemeStore();
defineProps({
    scrollHeight: {
        type: Number,
        required: false,
        default: 500
    }
});
const cachedList = ref<ZxCmsCmsBlogPublicDto[]>([]);
const { getList, pageable } = useBlogList();
const scrollList = async (pageNum: number) => {
    pageable.pageNum += pageNum;
    const listRes = await getList();
    cachedList.value = cachedList.value.concat((listRes || []));
    return listRes.length;
};

//infinite scroll load事件
const onLoad = async ({ side, done }: { side: 'end' | 'start' | 'both', done: (status: 'error' | 'loading' | 'empty' | 'ok') => void }) => {
    if (side === "end") {
        var rows = await scrollList(1);
        if (rows > 0) {
            done("ok");
        } else {
            done("empty");
        }
    }
}
</script>

<style scoped lang="scss">
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;

}
</style>