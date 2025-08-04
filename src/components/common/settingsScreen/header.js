import { useTheme, XStack, View, Text, getVariableValue } from "tamagui";
import Icon from "@components/ui/icon";
import { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { GradientBorder } from "@components/ui/gradientBorder";
import useInsets from "@hooks/ui/useInsets";
import { useSettingsStore } from "@stores/settingsScreen";
import { useTranslation } from "react-i18next";
import { useAnimatedStyle, interpolate, interpolateColor } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const padding = getVariableValue("$6", "space");
 
const SettingsHeader = ({title}) => {
	const insets = useInsets();
	const { t } = useTranslation();
	const theme = useTheme();
    const headerHeight = useSettingsStore(state => state.headerHeight);
	const setHeaderHeight = useSettingsStore(state => state.setHeaderHeight);
    const scrollY = useSettingsStore(state => state.scrollY)
    const navigation = useNavigation();
	const color = theme.color.get();

    const beforeScroll = theme.backgroundTransparent.get();
    const afterScroll = theme.glassButton.get();

	const handleLayout = useCallback(e => {
		setHeaderHeight(e.nativeEvent.layout.height + padding);
	}, []); 

    const animatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(scrollY?.value, [0, headerHeight], [beforeScroll, afterScroll]),
	}));

    const maskAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(scrollY?.value, [0, headerHeight], [0, 1]),
	}));

	return (
		<XStack onLayout={handleLayout} left={0} right={0} zIndex='$1' pt={insets.top} position='absolute' pb='$6' ph='$6' alignItems='center' gap='$6'>
			<LinearGradient colors={["#000", "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFill} />
			<GradientBorder
				p={0} 
                animated={true}
                animatedStyle={animatedStyle}
                maskAnimatedStyle={maskAnimatedStyle}
				justifyContent='center'
				alignItems='center'
				h='$13'
				w='$13'
                onPress={() => navigation.goBack()}
				br='$full'
				backgroundColor='$glassButton'
				pressStyle={{
					scale: 0.9,
				}}
			>
				<Icon size={26} icon='chevron.left' color={color} />
			</GradientBorder> 

			<Text f={1} textAlign='center' numberOfLines={1} fz='$5' lh='$5' fw='$3' color='$color'>
				{t(`settings.${title}`)}
			</Text>

			<View w='$13' h='$13' />
		</XStack>
	);
};

export default SettingsHeader;
