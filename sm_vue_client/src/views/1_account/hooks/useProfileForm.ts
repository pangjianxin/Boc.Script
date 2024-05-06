import {
  VoloAbpAccountUpdateProfileDto,
  VoloAbpAccountProfileDto,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
import { SubmitEventPromise } from "vuetify";
import { useGlobalStore } from "@/store/globalStore";

export const useProfileForm = () => {
  const systemClient = new SystemClient(OpenAPI);
  const profileFormValid = ref(false);
  const profileForm: VoloAbpAccountUpdateProfileDto = reactive({
    userName: "",
    email: "",
    name: "",
    phoneNumber: "",
    concurrencyStamp: "",
  });

  const profileFormRules = {
    userName: [(value: string) => !!value || `登录用户名必填`],
    email: [(value: string) => !!value || `邮箱必填`],
    name: [(value: string) => !!value || `用户名称必填`],
    phoneNumber: [(value: string) => !!value || `手机号必填`],
  };

  const initProfileInfo = (v: VoloAbpAccountProfileDto) => {
    profileForm.concurrencyStamp = v.concurrencyStamp;
    profileForm.email = v.email;
    profileForm.name = v.name;
    profileForm.phoneNumber = v.phoneNumber;
    profileForm.userName = v.userName;
    profileForm.surname = v.surname;
  };

  const submitUpdateProfile = async (e: SubmitEventPromise) => {
    profileFormValid.value = (await e).valid;
    if (profileFormValid.value === true) {
      const { setLoading, setSnackbarText } = useGlobalStore();
      try {
        setLoading(true);
        await systemClient.profile.profileUpdate({ requestBody: profileForm });
      } finally {
        setLoading(false);
        setSnackbarText("操作成功");
      }
    }
  };

  return {
    profileFormValid,
    profileForm,
    profileFormRules,
    initProfileInfo,
    submitUpdateProfile,
  };
};
