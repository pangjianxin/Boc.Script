import {
  VoloAbpIdentityIdentityRoleDto,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
export const useIdentityRoleList = () => {
  const systemClient = new SystemClient(OpenAPI);
  const list = ref<VoloAbpIdentityIdentityRoleDto[]>([]);
  const filter = ref("");
  const loading = ref(false);
  const sortKey = ref<string | undefined>("");
  const sortOrder = ref<string | "asc" | "desc" | undefined>("");

  const sortBy = computed(() => {
    if (sortKey.value && sortOrder.value) {
      return `${sortKey.value} ${sortOrder.value}`;
    }
    return undefined;
  });

  const pageable = reactive<Pageable>({
    pageNum: 0,
    pageSize: 10,
    total: 0,
  });

  const pageSizeArray = [5, 10, 15, 20];

  const headers = [
    {
      title: "操作",
      key: "actions",
      sortable: false,
      width: 100,
      align: "start",
    },
    {
      title: "角色",
      sortable: true,
      key: "name",
      align: "start",
      width: 100,
    },
    {
      title: "是否公开",
      sortable: false,
      key: "isPublic",
      align: "start",
      width: 100,
    },
    {
      title: "是否默认",
      sortable: false,
      key: "isDefault",
      align: "start",
      width: 100,
    },
  ];

  const pageCount = computed(() =>
    Math.ceil(pageable.total / pageable.pageSize)
  );

  const onPaginationOptionsChanged = async ({
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
    const sort = sortBy?.[0];
    sortKey.value = sort?.key;
    sortOrder.value = sort?.order;
    await getList();
  };

  const scrollList = async (pageNum: number) => {
    pageable.pageNum += pageNum;
    return await getList();
  };

  const getList = async () => {
    try {
      loading.value = true;
      const res = await systemClient.role.roleGetList({
        filter: filter.value,
        sorting: sortBy.value,
        skipCount: (pageable.pageNum - 1) * pageable.pageSize,
        maxResultCount: pageable.pageSize,
      });
      list.value = (list.value || []).concat(res.items || []);
      pageable.total = res.totalCount!;
      return res.items?.length || 0;
    } finally {
      loading.value = false;
    }
  };

  const onDataChanged = (
    data: VoloAbpIdentityIdentityRoleDto,
    action: "create" | "edit" | "remove"
  ) => {
    if (action === "create") {
      list.value.unshift(data);
    } else if (action === "edit") {
      const index = list.value?.findIndex((x) => x.id === data.id);
      if (index !== undefined && index !== -1) {
        list.value?.splice(index, 1, data);
      }
    } else if (action === "remove") {
      const index = list.value?.findIndex((x) => x.id === data.id);
      if (index !== undefined && index !== -1) {
        list.value?.splice(index, 1);
      }
    }
  };

  watchDebounced(
    () => filter.value,
    async (newVal, oldVal) => {
      if (newVal !== oldVal) {
        await getList();
      }
    },
    {
      debounce: 300,
      maxWait: 1000,
    }
  );
  return {
    loading,
    list,
    filter,
    pageable,
    pageSizeArray,
    pageCount,
    headers,
    scrollList,
    onDataChanged,
    onPaginationOptionsChanged,
    getList,
  };
};
