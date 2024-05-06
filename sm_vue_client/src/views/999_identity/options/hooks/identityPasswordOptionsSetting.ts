import {
  SystemClient,
  BocSmIdentityOptionsDtosIdentityPasswordOptionsSettingDto,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
export const useIdentityPasswordOptionsSettingForm = () => {
  const formRef = ref();
  const formValid = ref(false);
  const formLoading = ref(false);
  const initLoading = ref(false);
  const form =
    reactive<BocSmIdentityOptionsDtosIdentityPasswordOptionsSettingDto>({
      requiredLength: undefined,
      requiredUniqueChars: undefined,
      requireNonAlphanumeric: undefined,
      requireLowercase: undefined,
      requireUppercase: undefined,
      requireDigit: undefined,
    });

  const formRules = {
    requiredLength: [(v: number) => !!v || "请输入密码最小长度"],
    requiredUniqueChars: [(v: number) => !!v || "请输入密码中的唯一字符个数"],
    requireNonAlphanumeric: [],
    requireLowercase: [],
    requireUppercase: [],
    requireDigit: [],
  };

  const initState = async () => {
    try {
      initLoading.value = true;
      const systemClient = new SystemClient(OpenAPI);
      const state =
        await systemClient.identityOptionsSetting.identityOptionsSettingGetPasswordOptions();
      form.requiredLength = state.requiredLength;
      form.requiredUniqueChars = state.requiredUniqueChars;
      form.requireNonAlphanumeric = state.requireNonAlphanumeric;
      form.requireLowercase = state.requireLowercase;
      form.requireUppercase = state.requireUppercase;
      form.requireDigit = state.requireDigit;
    } finally {
      initLoading.value = false;
    }
  };

  const submit = async () => {
    const systemClient = new SystemClient(OpenAPI);
    systemClient.identityOptionsSetting.identityOptionsSettingUpdatePasswordOptions(
      { requestBody: form }
    );
  };

  return {
    form,
    formRef,
    formRules,
    formValid,
    formLoading,
    initLoading,
    initState,
    submit,
  };
};
