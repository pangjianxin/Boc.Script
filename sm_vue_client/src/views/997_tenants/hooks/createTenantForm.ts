import {
  SystemClient,
  VoloAbpTenantManagementTenantCreateDto,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
import { useGlobalStore } from "@/store/globalStore";

export const useCreateTenantForm = () => {
  const systemClient = new SystemClient(OpenAPI);
  const createFormValid = ref(false);
  const createForm = reactive<VoloAbpTenantManagementTenantCreateDto>({
    extraProperties: null,
    name: "",
    adminEmailAddress: "",
    adminPassword: "",
  });

  const createFormRules = {
    name: [(val: string) => !!val || "租户名必填"],
    adminEmailAddress: [(val: string) => !!val || "该租户的管理员邮箱"],
    adminPassword: [(val: string) => !!val || "该租户的管理员密码必填"],
  };

  const submit = async () => {
    const { setLoading, setSnackbarText } = useGlobalStore();
    try {
      setLoading(true);
      const created = await systemClient.tenant.tenantCreate({
        requestBody: createForm,
      });
      setSnackbarText("创建租户成功");
      return created;
    } finally {
      setLoading(false);
    }
  };

  return { createFormValid, createForm, createFormRules, submit };
};
