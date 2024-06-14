<template>
    <v-dialog :model-value="modelValue" @update:model-value="e => emits('update:modelValue', e)" width="50%">
        <v-card>
            <template #title>
                更新类别信息
            </template>
            <template #subtitle>
                {{ current?.title }}的当前类别为
                <v-chip color="warning" variant="text" rounded="0" size="small">
                    {{ currentCat?.title }}
                </v-chip>
            </template>
            <v-divider class="mb-4"></v-divider>
            <v-treeview color="red" :items="list" selected-color="red" :open-strategy="'single'" activatable
                item-title="title" item-value="id">
                <template v-slot:prepend="{ item }">
                    <v-icon
                        :icon="item.children && item.children.length > 0 ? mdiFolderAccountOutline : mdiFileDocument">
                    </v-icon>
                </template>
                <template #append="{ isActive, item }">
                    <v-btn variant="outlined" size="small" color="success" v-if="isActive"
                        @click="onUpdateCategory(item.id!)" :prepend-icon="mdiFileDocument">
                        变更为该类别
                    </v-btn>
                </template>
            </v-treeview>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { BocSmCategoriesDtosCategoryDto, BocSmScriptsDtosScriptDto, SystemClient } from '@/openapi/system';
import { mdiFolderAccountOutline, mdiFileDocument } from '@mdi/js';
import { OpenAPI } from '@/openapi/system/core/OpenAPI';
import { useCategoryList } from '@/views/3_categories/hooks/categoryList';
import { useGlobalStore } from '@/store/globalStore';

const { setSnackbarText } = useGlobalStore();
const currentCat = ref<BocSmCategoriesDtosCategoryDto>();
const current = ref<BocSmScriptsDtosScriptDto>();
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    entityId: {
        type: String,
        required: false,
        default: undefined
    }
});

const emits = defineEmits(['update:modelValue', "update:notify"]);

const { list, getList } = useCategoryList();

const onUpdateCategory = (categoryId: string) => {
    const client = new SystemClient(OpenAPI);
    client.script.scriptUpdateCategory({
        id: current.value!.id!,
        requestBody: {
            categoryId: categoryId
        }
    });
    setSnackbarText('类别更新成功');
    emits('update:modelValue', false);
    emits('update:notify', true);
}

watch(() => props.modelValue, async (value) => {
    if (value) {
        const client = new SystemClient(OpenAPI);
        current.value = await client.script.scriptGet({ id: props.entityId! });
        currentCat.value = await client.category.categoryGet({ id: current.value.categoryId! });
        await getList();
    }
});

</script>

<style scoped></style>