import {
  BocSmCategoriesDtosUpdateCategoryDto,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
export const useUpdateCategoryForm = () => {
  const id = ref<string | undefined>(undefined);
  const formRef = ref();
  const formLoading = ref(false);
  const formValid = ref(false);
  const form = reactive<BocSmCategoriesDtosUpdateCategoryDto>({
    title: null,
  });

  const formRules = {
    title: [
      (v: string | undefined) => {
        if (!v) {
          return "请输入类别名称";
        }
        if (v.length > 128) {
          return "名称长度不能超过128个字符";
        }
        return true;
      },
    ],
  };

  const updateParams = async (idVal: string | undefined) => {
    const systemClient = new SystemClient(OpenAPI);
    const entity = await systemClient.category.categoryGet({ id: idVal! });
    id.value = idVal;
    form.title = entity.title;
  };

  const submit = async () => {
    try {
      formLoading.value = true;
      const systemClient = new SystemClient(OpenAPI);
      await systemClient.category.categoryUpdate({
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
    updateParams,
  };
};
