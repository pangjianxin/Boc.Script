import {
  VoloAbpIdentityIdentityUserDto,
  VoloAbpIdentityIdentityUserUpdateDto,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
import { useGlobalStore } from "@/store/globalStore";
import { useAbpSessionStore } from "@/store/abpSessionStore";

export const useUpdateIdentityUserForm = () => {
  const systemClient = new SystemClient(OpenAPI);
  const updateFormValid = ref(false);
  const identityUserId = ref("");
  const isEditCurrentUser = ref(false);
  const roleList = ref<string[]>([]);
  const updateForm = reactive<VoloAbpIdentityIdentityUserUpdateDto>({
    extraProperties: {},
    userName: "",
    name: null,
    surname: null,
    email: "",
    phoneNumber: null,
    isActive: true,
    lockoutEnabled: true,
    roleNames: [],
    password: null,
    concurrencyStamp: null,
  });

  const updateFormRules = {
    extraProperties: [],
    userName: [(val: string) => !!val || "用户名必填"],
    name: [],
    surname: [],
    email: [
      (val: string) => !!val || "邮箱必填",
      (val: string) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? true : "邮箱格式不正确",
    ],
    phoneNumber: [
      // (val: string) =>
      //   /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(val)
      //     ? true
      //     : "手机号格式不正确",
    ],
    isActive: [],
    lockoutEnabled: [],
    roleNames: [],
    password: [],
    concurrencyStamp: [],
  };

  const initForm = (userInfo: VoloAbpIdentityIdentityUserDto) => {
    if (userInfo.extraProperties) {
      for (const key in userInfo.extraProperties) {
        updateForm.extraProperties![key] = userInfo.extraProperties[key];
      }
    }
    updateForm.userName = userInfo.userName!;
    updateForm.name = userInfo.name;
    updateForm.surname = userInfo.surname;
    updateForm.email = userInfo.email!;
    updateForm.phoneNumber = userInfo.phoneNumber;
    updateForm.isActive = userInfo.isActive;
    updateForm.lockoutEnabled = userInfo.lockoutEnabled;
    updateForm.concurrencyStamp = userInfo.concurrencyStamp;
  };

  const fetchUserInfo = async (userId: string) => {
    const abpSessionStore = useAbpSessionStore();
    //用户id
    identityUserId.value = userId;
    //是否编辑当前用户
    isEditCurrentUser.value = abpSessionStore.currentUser?.id === userId;
    //获取用户信息
    const res = await systemClient.user.userGet({ id: userId });
    initForm(res);
    //获取角色信息
    await getAssignableRoles();
  };

  const getAssignableRoles = async () => {
    updateForm.roleNames = [];
    roleList.value = [];
    const roles = await systemClient.user.userGetAssignableRoles();
    const userRoels = (
      await systemClient.user.userGetRoles({
        id: identityUserId.value!,
      })
    ).items;

    roles.items?.forEach((role) => {
      roleList.value.push(role.name!);
      if (userRoels?.some((it) => it.name === role.name)) {
        updateForm.roleNames?.push(role.name!);
      }
    });
  };

  const submitUpdateIdentityUser = async () => {
    const { setLoading, setSnackbarText } = useGlobalStore();
    try {
      setLoading(true);
      const res = await systemClient.user.userUpdate({
        id: identityUserId.value!,
        requestBody: updateForm,
      });
      setSnackbarText("更新成功");
      return res;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateFormValid,
    updateForm,
    updateFormRules,
    identityUserId,
    roleList,
    fetchUserInfo,
    initForm,
    submitUpdateIdentityUser,
  };
};
