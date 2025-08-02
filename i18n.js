import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./src/locales/en.json";
import ru from "./src/locales/ru.json";
import fr from "./src/locales/fr.json";
import ua from "./src/locales/ua.json";
import ge from "./src/locales/ge.json";
import jp from "./src/locales/jp.json";

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  ua: { translation: ua },
  ge: { translation: ge },
  fr: { translation: fr },
  jp: { translation: jp },
};

const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales)) {
    return locales[0].languageCode;
  }
  return "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
