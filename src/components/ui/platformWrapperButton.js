import { BlurView } from "expo-blur";
import { Platform, View } from "react-native";
import { COLORS } from "../../constants/theme";

export const PlatformWrapperButton = ({ children, style, blurProps = {}, viewProps = {} }) => {
	if (Platform.OS === "ios") {
		return (
			<BlurView style={style} blurReductionFactor={4} tint='dark' intensity={100} {...blurProps}>
				{children}
			</BlurView>
		);
	} else {
		return (
			<View style={[style, { backgroundColor: COLORS.glassButton }]} {...viewProps}>
				{children}
			</View>
		);
	}
};
