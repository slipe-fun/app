import { settingsScreen } from "@constants/settingsScreens";
import { View } from "tamagui";
import SettingsSectionList from "@components/common/settingsScreen/main/sectionList";

const SettingsScreen = () => {
	return (
		<View flex={1} backgroundColor='$bg'>
			<SettingsSectionList data={settingsScreen} />
		</View>
	);
};

export default SettingsScreen;
