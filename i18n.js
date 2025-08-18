import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";
import { createDefaultStorage } from "@lib/storage";

import en from "./src/locales/en.json";
import ru from "./src/locales/ru.json";
import fr from "./src/locales/fr.json";
import uk from "./src/locales/uk.json";
import de from "./src/locales/de.json";
import jp from "./src/locales/jp.json";
import pl from "./src/locales/pl.json";
import hi from "./src/locales/hi.json";

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  uk: { translation: uk },
  de: { translation: de },
  fr: { translation: fr },
  jp: { translation: jp },
  pl: { translation: pl },
  hi: { translation: hi },
};

const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales)) {
    return locales[0].languageCode;
  }
  return "en";
};

const storage = createDefaultStorage("settings");
const language = storage?.getString("language") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  // lng: language === "auto" ? getDeviceLanguage() : language,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
