import {
  VoloAbpIdentityIdentityRoleDto,
  VoloAbpIdentityIdentityRoleUpdateDto,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
import { useGlobalStore } from "@/store/globalStore";

export const useUpdateIdentityRoleForm = () => {
  const systemClient = new SystemClient(OpenAPI);
  const updateFormValid = ref(false);
  const identityRoleId = ref("");
  const updateForm = reactive<VoloAbpIdentityIdentityRoleUpdateDto>({
    name: "",
    isDefault: false,
    isPublic: false,
    concurrencyStamp: null,
  });
  const updateFormRules = {
    name: [(val: string) => !!val || "请输入角色名称"],
    isDefault: [],
    isPublic: [],
    concurrencyStamp: [],
  };

  const initForm = (input: VoloAbpIdentityIdentityRoleDto) => {
    identityRoleId.value = input.id!;
    updateForm.name = input.name!;
    updateForm.isDefault = input.isDefault;
    updateForm.isPublic = input.isPublic;
    updateForm.concurrencyStamp = input.concurrencyStamp;
  };

  const submitUpdateIdentityRole = async () => {
    const { setLoading, setSnackbarText } = useGlobalStore();
    try {
      setLoading(true);
      const res = await systemClient.role.roleUpdate({
        id: identityRoleId.value,
        requestBody: updateForm,
      });
      setSnackbarText("更新成功");
      return res;
    } finally {
      setLoading(false);
    }
  };
  return {
    updateForm,
    updateFormValid,
    updateFormRules,
    initForm,
    submitUpdateIdentityRole,
  };
};
