// plugins/vuetify/vuetify.js
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import {
  mdiNoteTextOutline,
  mdiNewspaperVariantOutline,
  mdiBankTransfer,
  mdiHomeAccount,
  mdiAccountMultipleOutline,
  mdiImageMultiple,
  mdiListBoxOutline,
  mdiAccountCog,
  mdiAccountTie,
  mdiLogin,
  mdiDomain,
  mdiWebBox,
  mdiCopyright,
  mdiTrademark,
  mdiFileCogOutline,
  mdiTableArrowRight,
  mdiAccountMultiple,
  mdiHome,
  mdiWalletMembership,
  mdiScriptText,
  mdiListBox,
} from "@mdi/js";
import { VTreeview } from "vuetify/labs/VTreeview";
export const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      mdiNoteTextOutline: mdiNoteTextOutline,
      mdiNewspaperVariantOutline: mdiNewspaperVariantOutline,
      mdiBankTransfer: mdiBankTransfer,
      mdiHomeAccount: mdiHomeAccount,
      mdiAccountMultipleOutline: mdiAccountMultipleOutline,
      mdiImageMultiple: mdiImageMultiple,
      mdiListBoxOutline: mdiListBoxOutline,
      mdiAccountCog: mdiAccountCog,
      mdiAccountTie: mdiAccountTie,
      mdiLogin: mdiLogin,
      mdiDomain: mdiDomain,
      mdiWebBox: mdiWebBox,
      mdiCopyright: mdiCopyright,
      mdiTrademark: mdiTrademark,
      mdiFileCogOutline: mdiFileCogOutline,
      mdiTableArrowRight: mdiTableArrowRight,
      mdiAccountMultiple: mdiAccountMultiple,
      mdiHome: mdiHome,
      mdiWalletMembership: mdiWalletMembership,
      mdiScriptText: mdiScriptText,
      mdiListBox: mdiListBox,
    },
    sets: {
      mdi,
    },
  },
  components: {
    VTreeview,
  },
});
