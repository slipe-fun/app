
import { View, Platform } from "react-native";
import { styles } from "../styles/tabBarStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabBarItem from "./tabBarItem";

const CustomTabBar = ({ state, navigation }) => {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.tabBarContainer, { paddingBottom: Platform.OS === "ios" ? insets.bottom : insets.bottom + 8 }]}>
			{state.routes.map((route, index) => {
				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const iconName = route.name.charAt(0).toLowerCase() + route.name.slice(1);

				return (
					<TabBarItem
						key={route.key}
						route={route}
						isFocused={isFocused}
						onPress={onPress}
						iconName={iconName}
					/>
				);
			})}
		</View>
	);
};

export default CustomTabBar;