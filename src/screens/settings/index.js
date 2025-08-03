import { settingsScreens } from "@constants/settingsScreens";
import { View } from "tamagui";
import SettingsHeader from "@components/common/settingsScreen/header";
import SettingsSectionList from "@components/common/settingsScreen/main/sectionList";

const SettingsScreen = () => {
	return (
		<View flex={1} backgroundColor='$bg'>
			<SettingsHeader title="mainTitle" />
			<SettingsSectionList data={settingsScreens} />
		</View>
	);
};

export default SettingsScreen;
