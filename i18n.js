import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./src/locales/en.json";
import ru from "./src/locales/ru.json";
import fr from "./src/locales/fr.json";

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  fr: { translation: fr },
};

const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales)) {
    return locales[0].languageCode;
  }
  return "ru";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
