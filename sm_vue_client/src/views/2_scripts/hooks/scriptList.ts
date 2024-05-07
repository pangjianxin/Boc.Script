import { SystemClient, BocSmScriptsDtosScriptDto } from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
export const useScriptList = () => {
  const loading = ref(false);
  const list = ref<BocSmScriptsDtosScriptDto[]>([]);
  const pageable = reactive<Pageable>({
    filter: undefined,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    sorting: undefined,
  });

  const headers = [
    {
      title: "脚本名称",
      width: 200,
      sortable: true,
      key: "title",
    },
    {
      title: "脚本描述",
      width: 300,
      sortable: false,
      key: "description",
    },
    {
      title: "脚本内容",
      width: 200,
      sortable: false,
      key: "content",
    },
    {
      title: "操作",
      width: 250,
      sortable: false,
      key: "actions",
    },
  ];
  const onPageOptionUpdated = async ({
    page,
    itemsPerPage,
    sortBy,
  }: {
    page: number;
    itemsPerPage: number;
    sortBy: { key: string; order: string }[] | undefined;
  }) => {
    pageable.pageNum = page;
    pageable.pageSize = itemsPerPage;
    if (sortBy && sortBy.length > 0) {
      pageable.sorting = sortBy[0].key + " " + sortBy[0].order;
    }
    await getList();
  };

  const resolveParameters = async (id: string) => {
    const systemClient = new SystemClient(OpenAPI);
    const parameters = await systemClient.script.scriptResolveParameters({
      id: id,
    });
    return parameters;
  };
  const getList = async (category: string | undefined = undefined) => {
    const systemClient = new SystemClient(OpenAPI);
    try {
      loading.value = true;
      const res = await systemClient.script.scriptGetList({
        filter: pageable.filter,
        categoryId: category,
        sorting: pageable.sorting,
        skipCount: (pageable.pageNum - 1) * pageable.pageSize,
        maxResultCount: pageable.pageSize,
      });
      list.value = res.items!;
      pageable.total = res.totalCount!;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    list,
    pageable,
    getList,
    headers,
    resolveParameters,
    onPageOptionUpdated,
  };
};
