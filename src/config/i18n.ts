import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-locize-backend";
import Constants from "expo-constants";
import * as Localization from "expo-localization";

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    backend: {
      projectId: Constants.manifest?.extra?.locizeProjectId,
      apiKey:
        Constants.manifest?.extra?.enableInExpoDevelopment &&
        Constants.manifest?.extra?.locizeApiKey,
    },
    lng: Localization.locale,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
