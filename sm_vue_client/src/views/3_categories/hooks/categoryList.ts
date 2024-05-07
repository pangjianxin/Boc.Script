import { SystemClient, BocSmCategoriesDtosCategoryDto } from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
export type CategoryTreeItem = BocSmCategoriesDtosCategoryDto & {
  children: CategoryTreeItem[] | undefined;
};
export const useCategoryList = () => {
  const loading = ref(false);
  const list = ref<CategoryTreeItem[]>([]);
  const pageable = reactive<Pageable>({
    filter: undefined,
    pageNum: 1,
    pageSize: 1000,
    total: 0,
    sorting: undefined,
  });

  const transform = (
    items: BocSmCategoriesDtosCategoryDto[]
  ): CategoryTreeItem[] => {
    // 步骤1
    const tempItems = items.map((item) => ({
      ...item,
      children: [] as CategoryTreeItem[],
    }));

    // 步骤2
    tempItems.forEach((item: CategoryTreeItem) => {
      const parent = tempItems.find(
        (parentItem) => parentItem.id === item.parentId
      );
      if (parent) {
        parent.children.push(item);
      }
    });

    // 步骤3
    return tempItems.filter((item) => !item.parentId);
  };

  const getList = async (parentId: string | undefined = undefined) => {
    const systemClient = new SystemClient(OpenAPI);
    try {
      loading.value = true;
      const res = await systemClient.category.categoryGetList({
        filter: pageable.filter,
        parentId: parentId,
        sorting: pageable.sorting,
        skipCount: (pageable.pageNum - 1) * pageable.pageSize,
        maxResultCount: pageable.pageSize,
      });
      list.value = transform(res.items || []);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    list,
    pageable,
    getList,
    transform,
  };
};
