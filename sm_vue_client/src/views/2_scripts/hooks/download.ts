import {
  BocSmScriptsDtosDownloadScriptDto,
  SystemClient,
} from "@/openapi/system";
import { OpenAPI } from "@/openapi/system/core/OpenAPI";
import fileDownload from "js-file-download";
export const useDownloadForm = () => {
  const id = ref<string | undefined>(undefined);
  const form = reactive<BocSmScriptsDtosDownloadScriptDto>({
    parameters: {},
  });
  const formRules = reactive({
    item: [(v: string) => !!v || "该项不能为空"],
  });
  const formLoading = ref(false);
  const formRef = ref();
  const formValid = ref(false);
  const updateFormItems = (
    record: Array<string> | undefined,
    idVal: string | undefined
  ) => {
    if (record && record.length > 0) {
      form.parameters = {};
      record?.forEach((p) => {
        form.parameters![p] = "";
      });
    }
    id.value = idVal;
  };
  const submit = async (category: string | undefined, script: string) => {
    const systemClient = new SystemClient(OpenAPI);
    const blob = await systemClient.script.scriptDownload({
      id: id.value!,
      requestBody: form,
    });
    fileDownload(blob, `${category}-${script}.txt`);
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
