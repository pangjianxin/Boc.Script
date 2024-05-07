import {
  BocSmScriptsDtosUpdateScriptDto,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
export const useUpdateScriptForm = () => {
  const id = ref<string | undefined>(undefined);
  const formRef = ref();
  const formLoading = ref(false);
  const formValid = ref(false);
  const form = reactive<BocSmScriptsDtosUpdateScriptDto>({
    title: null,
    description: null,
    content: null,
  });

  const formRules = {
    title: [
      (v: string | undefined) => {
        if (!v) {
          return "请输入标题";
        }
        if (v.length > 128) {
          return "标题长度不能超过50个字符";
        }
        return true;
      },
    ],
    description: [
      (v: string | undefined) => {
        if (v) {
          if (v.length > 256) {
            return "描述长度不能超过100个字符";
          }
        }
        return true;
      },
    ],
    content: [(v: string) => !!v || "请输入内容"],
  };

  const updateFormItems = async (idVal: string | undefined) => {
    const systemClient = new SystemClient(OpenAPI);
    const entity = await systemClient.script.scriptGet({ id: idVal! });
    id.value = idVal;
    form.title = entity.title;
    form.content = entity.content;
    form.description = entity.description;
  };

  const submit = async () => {
    try {
      formLoading.value = true;
      const systemClient = new SystemClient(OpenAPI);
      await systemClient.script.scriptUpdate({
        id: id.value!,
        requestBody: form,
      });
    } finally {
      formLoading.value = false;
    }
  };

  return {
    form,
    formRef,
    formLoading,
    formValid,
    formRules,
    submit,
    updateFormItems,
  };
};
