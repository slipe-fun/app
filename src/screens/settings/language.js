import { Text, View, YStack } from "tamagui";
import { useState, useEffect } from "react";
import * as RNLocalize from "react-native-localize";

import SettingsHeader from "@components/common/settingsScreen/header";
import SettingRow from "@components/common/settingsScreen/main/settingRow";
import { localesList } from "@constants/locales";
import { useSettingsStore } from "@stores/settingsScreen";
import { createDefaultStorage } from "@lib/storage";
import i18n from "i18n";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";

const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  return (Array.isArray(locales) && locales[0]?.languageCode) || "en";
};

export default function SettingsLanguageScreen() {
  const headerHeight = useSettingsStore((state) => state.headerHeight);
  const storage = createDefaultStorage("settings");
  const { t } = useTranslation();

  const [language, setLanguage] = useState("en");
  const [deviceLanguage, setDeviceLanguage] = useState("en");

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    storage.set("language", lang);
    setLanguage(lang);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };

  useEffect(() => {
    setLanguage(storage.getString("language") || "en");
    setDeviceLanguage(getDeviceLanguage());
  }, []);

  return (
    <View backgroundColor="$bg" gap="$8" ph="$6" pt={headerHeight} f={1}>
      <SettingsHeader title="settingsLanguage" />

      <YStack gap="$5">
        <View backgroundColor="$backgroundTransparent" br="$7">
          <SettingRow
            title="settingsAutoLanguage"
            image={localesList.find((i) => i.id === deviceLanguage)?.image}
            value={language === "auto"}
            type="toggle"
            onPress={() =>
              handleLanguageChange(
                language === "auto" ? deviceLanguage : "auto"
              )
            }
            icon
            color="innerBlock"
            separator={false}
          />
        </View>

        <View ph="$6">
          <Text fz="$3" lh="$3" fw="$2" color="$secondaryText">
            {t("settings.settingsAutoLanguageDescription")}
          </Text>
        </View>
      </YStack>

      <YStack backgroundColor="$backgroundTransparent" br="$7">
        {localesList.map((item, index) => (
          <SettingRow
            key={item.id}
            title={item.name}
            value={language === item.id}
            translate={false}
            image={item.image}
            type="checkbox"
            onPress={() => handleLanguageChange(item.id)}
            icon
            color="innerBlock"
            separator={index !== localesList.length - 1}
          />
        ))}
      </YStack>
    </View>
  );
}
