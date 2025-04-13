import { useRef, useEffect } from "react";
import { View, TouchableOpacity, Animated, Easing, Text, Platform } from "react-native";
import { ROUTES } from "../../constants/routes";
import { styles } from "./styles/tabBarStyles";
import Icon from "./icon";
import { COLORS } from "../../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomTabBar = ({ state, descriptors, navigation }) => {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.tabBarContainer, { paddingBottom: Platform.OS === "ios" ? insets.bottom - 2 : insets.bottom + 6 }]}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const isFocused = state.index === index;

				const focusAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

				useEffect(() => {
					Animated.timing(focusAnim, {
						toValue: isFocused ? 1 : 0,
						duration: 150,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: false,
					}).start();
				}, [isFocused, focusAnim]);

				const interpolatedColor = focusAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [COLORS.white, COLORS.primary],
				});

				const interpolatedOpacity = focusAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [0.35, 1],
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

				const AnimatedText = Animated.createAnimatedComponent(Text);

				return (
					<View key={route.key} style={styles.tabItem}>
						<TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.tabButton}>
							<Animated.View
								style={{
									opacity: interpolatedOpacity,
									alignItems: "center",
									width: '100%',
									gap: 2,
									justifyContent: "center",
								}}
							>
								<Icon icon={iconName} size={34} color={interpolatedColor} />
								<AnimatedText
									style={[{
										color: interpolatedColor,
									}, styles.tabButtonText]}
								>
									{pageName}
								</AnimatedText>
							</Animated.View>
						</TouchableOpacity>
					</View>
				);
			})}
		</View>
	);
};

export default CustomTabBar;
