
import { useEffect } from "react";
import { View, Platform } from "react-native";
import { styles } from "./styles/tabBarStyles";
import { Pressable } from "react-native-gesture-handler";
import Icon from "./icon";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolateColor, useAnimatedProps } from "react-native-reanimated";
import { COLORS } from "../../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomTabBar = ({ state, navigation }) => {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.tabBarContainer, { paddingBottom: Platform.OS === "ios" ? insets.bottom : insets.bottom + 8 }]}>
			{state.routes.map((route, index) => {
				const isFocused = state.index === index;

				const opacityValue = useSharedValue(isFocused ? 1 : 0.35);
				const colorValue = useSharedValue(isFocused ? 1 : 0);

				const buttonOpacityStyles = useAnimatedStyle(() => {
					return {
						opacity: opacityValue.value,
					};
				});

				const buttonColorStyles = useAnimatedStyle(() => {
					return {
						backgroundColor: interpolateColor(colorValue.value, [0, 1], [COLORS.elemBackground, COLORS.white]),
					};
				});

				const buttonIconColorProps = useAnimatedProps(() => {
					return {
						fill: interpolateColor(colorValue.value, [0, 1], [COLORS.transparentIcon, COLORS.black]),
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

				let iconName = route.name.charAt(0).toLowerCase() + route.name.slice(1);

				useEffect(() => {
					opacityValue.value = withTiming(isFocused ? 1 : 0.35, { duration: 150, easing: Easing.ease });
					colorValue.value = withTiming(isFocused ? 1 : 0, { duration: 150, easing: Easing.ease });
				}, [isFocused]);

				return (
					<View key={route.key} style={styles.tabItem}>
						<Pressable onPress={onPress}>
							{route.name === "Publish" ? (
								<Animated.View
									key={route.name}
									style={[
										route.name === "Publish" ? styles.publishButton : styles.tabItem,
										buttonColorStyles
									]}
								>
									<Icon icon={iconName} animatedProps={buttonIconColorProps} style={{ color: COLORS.white }} size={32} />
								</Animated.View>
							) : (
								<Animated.View
								key={route.name}
									style={[
										route.name === "Publish" ? styles.publishButton : styles.tabItem,
										buttonOpacityStyles
									]}
								>
									<Icon icon={iconName} size={32} />
								</Animated.View>
							)}
						</Pressable>
					</View>
				);
			})}
		</View>
	);
};

export default CustomTabBar;