/** Global Store */
export const useGlobalStore = defineStore("global", () => {
  /** Loading overlay */
  const loading: Ref<boolean> = ref(false);
  /** SnackBar Text */
  const snackbarText: Ref<string | undefined> = ref("");
  const snackbar: Ref<boolean> = ref(false);
  const snackbarColor: Ref<string> = ref("");

  /**
   * Show loading Overlay
   *
   * @param display - visibility
   */
  const setLoading = (display: boolean): void => {
    loading.value = display;
  };

  /**
   * Show snackbar message
   *
   * @param msg - snackbar message
   * @param color - snackbar color,stand for action result
   */
  const setSnackbarText = (
    msg: string = "",
    color: string = "primary"
  ): void => {
    snackbar.value = true;
    snackbarColor.value = color;
    snackbarText.value = msg;
  };

  const closeSnackbar = () => {
    snackbar.value = false;
    snackbarText.value = undefined;
  };

  return {
    loading,
    snackbar,
    snackbarText,
    snackbarColor,
    setLoading,
    setSnackbarText,
    closeSnackbar,
  };
});
