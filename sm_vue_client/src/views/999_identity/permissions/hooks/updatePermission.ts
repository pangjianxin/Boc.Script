import {
  SystemClient,
  VoloAbpPermissionManagementPermissionGroupDto,
  VoloAbpPermissionManagementUpdatePermissionsDto,
  VoloAbpPermissionManagementPermissionGrantInfoDto,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
import { useGlobalStore } from "@/store/globalStore";

type PermissionGrantInfoViewModel =
  VoloAbpPermissionManagementPermissionGrantInfoDto & {
    depth: number;
  };

type PermissionGroupViewModel = Omit<
  VoloAbpPermissionManagementPermissionGroupDto,
  "permissions"
> & {
  permissions: PermissionGrantInfoViewModel[];
};

export const useUpdatePermissionForm = () => {
  const systemClient = new SystemClient(OpenAPI);
  const providerName = ref("");
  const providerKey = ref("");
  const formValid = ref(false);
  const form = reactive<VoloAbpPermissionManagementUpdatePermissionsDto>({});
  const permissionInfo = ref<PermissionGroupViewModel[]>([]);

  //我想要一个能够计算某一个grop中的permission是否全选的方法
  const isGroupAllSelected = (groupName: string) => {
    const group = permissionInfo.value.find(
      (group) => group.name === groupName
    );
    if (!group) return false;
    return group.permissions.every((permission) => permission.isGranted);
  };

  //分组权限全选/全不选
  const onGroupSelected = (groupName: string, val: boolean) => {
    permissionInfo.value.forEach((group) => {
      if (group.name === groupName) {
        group.permissions?.forEach((permission) => {
          permission.isGranted = val;
        });
      }
    });
  };
  //权限点击时触发的事件
  const onPermissionSelected = (permissionName: string, val: boolean) => {
    const permissions = permissionInfo.value.flatMap(
      (group) => group.permissions
    );

    const permission = permissions.find(
      (permission) => permission.name === permissionName
    );

    const parent = permissions.find((it) => it.name === permission?.parentName);

    const children = permissions.filter(
      (it) => it.parentName === permissionName
    );

    if (permission) {
      permission.isGranted = val;
    }
    if (parent && val === true) {
      parent.isGranted = val;
    }
    if (children && children.length > 0 && val === false) {
      children.forEach((it) => (it.isGranted = false));
    }
  };

  //获取权限并设置深度
  const getPermissions = async (key: string, name: string) => {
    providerName.value = name;
    providerKey.value = key;

    const groups = await systemClient.permissions.permissionsGet({
      providerKey: providerKey.value,
      providerName: providerName.value,
    });

    permissionInfo.value = groups.groups!.map((group) => ({
      ...group,
      permissions:
        group.permissions?.map((permission) => ({
          ...permission,
          depth: 0, // or whatever default value you want
        })) || [],
    }));
    permissionInfo.value.forEach((group) => {
      setDepths(group.permissions, null, 0);
    });
  };

  //计算某一个group是否被禁用
  const isGroupDisabled = (groupName: string) => {
    const permissions =
      permissionInfo.value.find((group) => group.name === groupName)
        ?.permissions || [];

    const grantedProviders =
      permissions.flatMap((it) => it.grantedProviders || []) || [];

    return (
      permissions?.every((it) => it.isGranted === true) &&
      grantedProviders.length > 0 &&
      grantedProviders.every((it) => it.providerName !== providerName.value)
    );
  };

  //计算某一个权限是否被禁用
  const isPermissionDisabled = (permissionName: string) => {
    const permission = permissionInfo.value
      .flatMap((group) => group.permissions)
      .find((permission) => permission.name === permissionName);
    const providers = permission?.grantedProviders || [];
    return (
      permission?.isGranted === true &&
      providers?.length > 0 &&
      providers?.every((it) => it.providerName !== providerName.value)
    );
  };

  //计算权限深度
  const setDepths = <
    T extends {
      name?: string | null;
      parentName?: string | null;
      depth?: number;
    }
  >(
    items: T[],
    currentParent: string | null,
    currentDepth: number
  ) => {
    for (const item of items) {
      if (item.parentName === currentParent) {
        item.depth = currentDepth!;
        setDepths(items, item.name!, currentDepth! + 1);
      }
    }
  };

  //提交修改
  const submit = async () => {
    const { setLoading, setSnackbarText } = useGlobalStore();
    try {
      setLoading(true);
      const permissions = permissionInfo.value.flatMap(
        (group) => group.permissions
      );

      form.permissions = permissions.map((permission) => ({
        name: permission?.name,
        isGranted: permission?.isGranted,
      }));

      await systemClient.permissions.permissionsUpdate({
        providerName: providerName.value,
        providerKey: providerKey.value,
        requestBody: form,
      });

      setSnackbarText("更新成功");
    } finally {
      setLoading(false);
    }
  };

  return {
    providerName,
    permissionInfo,
    form,
    formValid,
    isGroupAllSelected,
    onGroupSelected,
    onPermissionSelected,
    isGroupDisabled,
    isPermissionDisabled,
    getPermissions,
    submit,
  };
};
