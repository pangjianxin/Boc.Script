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
      title: "公司名称",
      width: 250,
      sortable: true,
      key: "name",
    },
    {
      title: "社会信用证号",
      width: 80,
      sortable: true,
      key: "creditCode",
    },
  ];
  const getList = async () => {
    const systemClient = new SystemClient(OpenAPI);
    try {
      loading.value = true;
      const res = await systemClient.script.scriptGetList({
        filter: pageable.filter,
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
  };
};
