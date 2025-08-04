import { Text, View, YStack } from "tamagui";
import SettingsHeader from "@components/common/settingsScreen/header";
import { localesList } from "@constants/locales";
import SettingRow from "@components/common/settingsScreen/main/settingRow";
import i18n from "i18n";
import { useSettingsStore } from "@stores/settingsScreen";
import { createDefaultStorage } from "@lib/storage";

const SettingsLanguageScreen = () => {
  const headerHeight = useSettingsStore((state) => state.headerHeight);
  const storage = createDefaultStorage("settings");
  const language = storage.getString("language") || "en";

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    console.log(language)
    storage.set("language", language);
  };

  return (
    <View backgroundColor="$bg" gap="$8" ph="$6" pt={headerHeight} f={1}>
      <SettingsHeader title="settingsLanguage" />
      <YStack gap="$5">
        <View backgroundColor="$backgroundTransparent" br="$7">
          <SettingRow
            title="Автоопределение языка"
            image={require("@assets/flags/en.webp")}
            value={true}
            translate={false}
            type="toggle"
            onPress={() => handleLanguageChange("auto")}
            icon
            color="innerBlock"
            separator={false}
          />
        </View>
        <View ph="$6">
          <Text fz="$3" lh="$3" fw="$2" color="$secondaryText">
            Автоматический вариант выбирается на основе темы устройства
          </Text>
        </View>
      </YStack>
      <YStack opacity={language === "auto" ? 0.5 : 1} backgroundColor="$backgroundTransparent" br="$7">
        {localesList.map((item, index) => (
          <SettingRow
            key={item.id + index}
            title={item.name}
            value={true}
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
};

export default SettingsLanguageScreen;
