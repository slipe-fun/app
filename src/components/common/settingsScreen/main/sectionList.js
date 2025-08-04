import { SectionList } from "react-native";
import { useCallback, useEffect } from "react";
import SettingRow from "./settingRow";
import { YStack } from "tamagui";
import { useSettingsStore } from "@stores/settingsScreen";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const SettingsSectionList = ({ data }) => {
	const headerHeight = useSettingsStore(state => state.headerHeight);
	const setTitle = useSettingsStore(state => state.setTitle);
	const scrollY = useSharedValue(0);
	const setScrollYRef = useSettingsStore(state => state.setScrollY);
	const navigation = useNavigation();

	const onScroll = useAnimatedScrollHandler(event => {
		scrollY.value = event.contentOffset.y;
	});

	const renderSection = useCallback(({ section }) => {
		return (
			<YStack backgroundColor='$backgroundTransparent' br='$7' mb='$8'>
				{section.data.map((item, index) => (
					<SettingRow
						key={item.screenName + index}
						color={item.color}
						icon={item.icon}
						title={item.screenName}
						separator={index !== section.data.length - 1}
						onPress={() => {setTitle(item.screenName); navigation.navigate(item.screenName);}}
					/>
				))}
			</YStack>
		);
	});

	useEffect(() => {
		setScrollYRef(scrollY);
	}, []);

	return (
		<AnimatedSectionList
			sections={data.filter(s => s.data?.length)} 
			keyExtractor={(item, index) => item.screenName + index}
			renderSectionHeader={renderSection}
			renderItem={() => null}
			onScroll={onScroll}
			contentContainerStyle={{ paddingHorizontal: 16, paddingTop: headerHeight }}
			stickySectionHeadersEnabled={false}
			style={{ flex: 1 }}
		/>
	);
};

export default SettingsSectionList;
