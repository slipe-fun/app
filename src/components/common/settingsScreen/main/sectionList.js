import { SectionList } from "react-native";
import { useCallback } from "react";
import SettingRow from "./settingRow";
import { YStack } from "tamagui";

const SettingsSectionList = ({ data }) => {
	const renderSection = useCallback(({ section }) => {
		return (
			<YStack backgroundColor='$backgroundTransparent' br='$7' mb='$8'>
				{section.data.map((item, index) => (
					<SettingRow
						key={item.screenName + index}
						color={item.color}
						icon={item.icon}
						title={item.title}
                        separator={index !== section.data.length - 1} 
						onPress={() => console.log("Navigate to:", item.screenName)}
					/>
				))}
			</YStack>
		);
	});

	return (
		<SectionList
			sections={data.filter(s => s.data?.length)}
			keyExtractor={(item, index) => item.screenName + index}
			renderSectionHeader={renderSection}
			renderItem={() => null}
			contentContainerStyle={{ paddingHorizontal: 16 }}
			stickySectionHeadersEnabled={false}
			style={{ flex: 1 }}
		/>
	);
};

export default SettingsSectionList;
