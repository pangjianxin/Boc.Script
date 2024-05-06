import { userManager } from "@/utils/oidc-user-manager";
export interface PasswordLogin {
  username: string;
  password: string;
}

export const usePasswordLogin = () => {
  const formRef = ref();
  const formValid = ref(false);
  const formLoading = ref(false);
  const form = reactive<PasswordLogin>({
    username: "",
    password: "",
  });

  const rules = {
    username: [(value: string) => !!value || `请输入你的用户名`],
    password: [(value: string) => !!value || "请输入你的密码"],
  };

  async function submit(requestBody: PasswordLogin) {
    await userManager.signinResourceOwnerCredentials({
      username: requestBody.username,
      password: requestBody.password,
      skipUserInfo: false,
    });
  }

  return {
    formRef,
    formValid,
    form,
    rules,
    formLoading,
    submit,
  };
};
