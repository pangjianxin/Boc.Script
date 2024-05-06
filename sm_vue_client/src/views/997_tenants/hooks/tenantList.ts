import {
  VoloAbpTenantManagementTenantDto,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
export const useTenantList = () => {
  const systemClient = new SystemClient(OpenAPI);
  const list = ref<VoloAbpTenantManagementTenantDto[]>([]);
  const filter = ref("");
  const loading = ref(false);

  const pageable = reactive<Pageable>({
    pageNum: 0,
    pageSize: 15,
    total: 0,
  });

  const getList = async () => {
    try {
      loading.value = true;
      const res = await systemClient.tenant.tenantGetList({
        filter: filter.value,
        skipCount: (pageable.pageNum - 1) * pageable.pageSize,
        maxResultCount: pageable.pageSize,
      });

      list.value = (res.items || []).concat(list.value || []);
      pageable.total = res.totalCount!;
      return res.items?.length || 0;
    } finally {
      loading.value = false;
    }
  };

  const scrollList = async (pageNum: number) => {
    pageable.pageNum += pageNum;
    return await getList();
  };

  const onDataChanged = (
    val: VoloAbpTenantManagementTenantDto,
    action: "create" | "remove" | "edit"
  ) => {
    if (action === "create") {
      list.value.unshift(val);
    } else if (action === "edit") {
      const index = list.value.findIndex((x) => x.id === val.id);
      if (index >= 0) {
        list.value.splice(index, 1, val);
      }
    } else if (action === "remove") {
      const index = list.value.findIndex((x) => x.id === val.id);
      if (index >= 0) {
        list.value.splice(index, 1);
      }
    }
  };

  watchDebounced(
    () => filter.value,
    async () => {
      list.value = [];
      pageable.pageNum = 0;
      await scrollList(1);
    },
    {
      debounce: 500,
      maxWait: 1000,
    }
  );

  return {
    list,
    filter,
    pageable,
    scrollList,
    onDataChanged,
    getList,
  };
};
