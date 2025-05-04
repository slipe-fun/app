import { useEffect } from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { ROUTES } from "../../constants/routes";
import { styles } from "./styles/tabBarStyles";
import Icon from "./icon";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import { COLORS } from "../../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomTabBar = ({ state, descriptors, navigation }) => {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.tabBarContainer, { paddingBottom: Platform.OS === "ios" ? insets.bottom : insets.bottom + 6 }]}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const isFocused = state.index === index;

				const opacityValue = useSharedValue(0.35);

				const buttonOpacityStyles = useAnimatedStyle(() => {
					return {
						opacity: opacityValue.value,
					};
				});

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

				let iconName;
				let pageName;
				if (route.name === ROUTES.BLOGS) {
					iconName = "feed";
					pageName = "Feed";
				} else if (route.name === ROUTES.PUBLISH) {
					iconName = "publish";
					pageName = "Publish";
				} else if (route.name === ROUTES.SEARCH) {
					iconName = "search";
					pageName = "Search";
				} else if (route.name === ROUTES.PROFILE) {
					iconName = "user";
					pageName = "Profile";
				}

				useEffect(() => {
					opacityValue.value = withTiming(isFocused ? 1 : 0.35, { duration: 200, easing: Easing.ease });
				}, [isFocused]);

				return (
					<View key={route.key} style={styles.tabItem}>
						<TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.tabButton}>
							<Animated.View
								style={[
									{
										alignItems: "center",
										width: "100%",
										gap: 2,
										justifyContent: "center",
									},
									buttonOpacityStyles,
								]}
							>
								<Icon icon={iconName} style={{ color: COLORS.white }} size={34} />
								<Text style={styles.tabButtonText}>{pageName}</Text>
							</Animated.View>
						</TouchableOpacity>
					</View>
				);
			})}
		</View>
	);
};

export default CustomTabBar;
