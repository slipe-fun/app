import { styles } from "../styles/captureImageStyles";
import { View, Pressable } from "react-native";
import { GradientBorder } from "../../../ui/gradientBorder";
import { PlatformWrapperButton } from "../../../ui/platformWrapperButton";
import Icon from "../../../ui/icon";
import { COLORS } from "../../../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";

export const CaptureImageHeader = () => {
	return (
		<View style={styles.header}>
			<LinearGradient colors={["rgba(0, 0, 0, 0.32)", "rgba(0, 0, 0, 0)"]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.gradient} />
			<View style={styles.footerWrapper}>
				<View style={styles.footerBlock}>
					<Pressable>
						<GradientBorder borderRadius={32} borderWidth={1}>
							<PlatformWrapperButton style={styles.menuButton}>
								<Icon icon='circleArrow' size={26} color={COLORS.white} />
							</PlatformWrapperButton>
						</GradientBorder>
					</Pressable>
				</View>
				<View style={styles.footerBlock}>
					<Pressable>
						<View style={styles.captureButton}>
							<View style={styles.captureButtonInside} />
						</View>
					</Pressable>
				</View>
				<View style={styles.footerBlock}>
					<Pressable>
						<GradientBorder borderRadius={32} borderWidth={1}>
							<PlatformWrapperButton style={styles.menuButton}>
								<Icon icon='message' size={26} color={COLORS.white} />
							</PlatformWrapperButton>
						</GradientBorder>
					</Pressable>
				</View>
			</View>
		</View>
	);
};
