import {
  BocSmCategoriesDtosCreateCategoryDto,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
export const useCreateCategoryForm = () => {
  const formRef = ref();
  const formLoading = ref(false);
  const formValid = ref(false);
  const form = reactive<BocSmCategoriesDtosCreateCategoryDto>({
    title: null,
    parentId: null,
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
    parentId: [],
  };

  const submit = async () => {
    try {
      formLoading.value = true;
      const systemClient = new SystemClient(OpenAPI);
      await systemClient.category.categoryCreate({
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
  };
};
