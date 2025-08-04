import { View } from "tamagui"
import SettingsHeader from "@components/common/settingsScreen/header"
import { localesList } from "@constants/locales"
import SettingRow from "@components/common/settingsScreen/main/settingRow"
import { YStack } from "tamagui"
import i18n from "i18n"
import { useSettingsStore } from "@stores/settingsScreen"

const SettingsLanguageScreen = () => {
    const headerHeight = useSettingsStore(state => state.headerHeight);

    return(
        <View backgroundColor="$bg" ph="$6" pt={headerHeight} f={1}>
            <SettingsHeader title="settingsLanguage" />
            <YStack backgroundColor='$backgroundTransparent' br='$7' mb='$8'>
                {localesList.map((item, index) => (
                    <SettingRow
                        key={item.id + index}
                        title={item.name}
                        active
                        translate={false}
                        image={item.image}
                        type="checkbox"
                        onPress={() => i18n.changeLanguage(item.id)}
                        icon
                        color="innerBlock"
                        separator={index !== localesList.length - 1}
                    />
                ))}
            </YStack>
        </View>
    )
}

export default SettingsLanguageScreen