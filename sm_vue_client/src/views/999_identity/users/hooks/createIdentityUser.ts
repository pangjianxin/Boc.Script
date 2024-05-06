import {
  VoloAbpIdentityIdentityUserCreateDto,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
import { useGlobalStore } from "@/store/globalStore";
export const useCreateIdentityUserForm = () => {
  const systemClient = new SystemClient(OpenAPI);
  const createFormValid = ref(false);
  const roleList = ref<string[] | undefined>([]);
  const createForm = reactive<VoloAbpIdentityIdentityUserCreateDto>({
    userName: "",
    name: null,
    surname: null,
    email: "",
    phoneNumber: null,
    isActive: true,
    lockoutEnabled: true,
    roleNames: [],
    password: "",
  });

  const createFormRules = {
    userName: [(val: string) => !!val || "用户名必填"],
    name: [(val: string) => !!val || "姓名必填"],
    surname: [],
    email: [
      (val: string) => !!val || "邮箱必填",
      (val: string) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? true : "邮箱格式不正确",
    ],
    phoneNumber: [],
    isActive: [],
    lockoutEnabled: [],
    roleNames: [],
    password: [(val: string) => !!val || "密码必填"],
  };

  const fetchRoles = async () => {
    roleList.value = [];
    roleList.value = (
      await systemClient.user.userGetAssignableRoles()
    ).items?.map((it) => {
      if (it.isDefault) {
        createForm.roleNames?.push(it.name!);
      }
      return it.name!;
    });
  };

  const submitCreateIdentityUser = async () => {
    const { setLoading, setSnackbarText } = useGlobalStore();
    try {
      setLoading(true);
      const res = await systemClient.user.userCreate({
        requestBody: createForm,
      });
      setSnackbarText("创建成功");
      return res;
    } finally {
      setLoading(false);
    }
  };

  return {
    createForm,
    createFormRules,
    createFormValid,
    roleList,
    fetchRoles,
    submitCreateIdentityUser,
  };
};
