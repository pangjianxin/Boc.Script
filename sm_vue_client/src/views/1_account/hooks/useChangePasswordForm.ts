import {
  VoloAbpAccountChangePasswordInput,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
import { SubmitEventPromise } from "vuetify";
import { useGlobalStore } from "@/store/globalStore";

export const useChangePasswordForm = () => {
  const systemClient = new SystemClient(OpenAPI);
  const passwordFormValid = ref(false);
  const currentPasswordShow = ref(false);
  const newPasswordShow = ref(false);
  const passwordForm: VoloAbpAccountChangePasswordInput = reactive({
    currentPassword: "",
    newPassword: "",
  });

  const passwordFormRules = {
    currentPassword: [(value: string) => !!value || `当前密码不能为空`],
    newPassword: [(value: string) => !!value || `新密码不能为空`],
  };

  const submitChangePassword = async (e: SubmitEventPromise) => {
    passwordFormValid.value = (await e).valid;
    if (passwordFormValid.value === true) {
      const { setLoading, setSnackbarText } = useGlobalStore();
      try {
        setLoading(true);
        await systemClient.profile.profileChangePassword({
          requestBody: passwordForm,
        });
      } finally {
        setLoading(false);
        setSnackbarText("操作成功");
      }
    }
  };

  return {
    passwordFormValid,
    passwordForm,
    passwordFormRules,
    currentPasswordShow,
    newPasswordShow,
    submitChangePassword,
  };
};
