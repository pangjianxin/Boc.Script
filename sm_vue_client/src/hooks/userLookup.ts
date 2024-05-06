import { VoloAbpUsersUserData, UserLookupService } from "@/openapi";

export const useUserLookup = () => {
  const userFilter = ref();
  const verificationField = ref<keyof VoloAbpUsersUserData>("name");
  const userFetchingLoading = ref(false);
  const users = ref<VoloAbpUsersUserData[] | null | undefined>([]);

  const fetchUser = async () => {
    userFetchingLoading.value = true;
    try {
      users.value = (
        await UserLookupService.userLookupSearch({
          filter: userFilter.value,
          skipCount: 0,
          maxResultCount: 10,
        })
      ).items;
    } finally {
      userFetchingLoading.value = false;
    }
  };

  watchDebounced(
    () => userFilter.value,
    async (newVal, oldVal) => {
      if (
        newVal !== oldVal &&
        !users.value?.some((it) => it[verificationField.value] === newVal)
      ) {
        await fetchUser();
      }
    },
    {
      maxWait: 1000,
      debounce: 300,
    }
  );

  return {
    userFilter,
    users,
    userFetchingLoading,
    verificationField,
  };
};
