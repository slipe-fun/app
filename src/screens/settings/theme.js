import { View } from "tamagui"
import SettingsHeader from "@components/common/settingsScreen/header"

const SettingsThemeScreen = () => {
    return(
        <View backgroundColor="$bg" f={1}>
            <SettingsHeader title="settingsTheme" />
        </View>
    )
}

export default SettingsThemeScreen