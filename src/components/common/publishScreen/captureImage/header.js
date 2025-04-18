import { styles } from "../styles/captureImageStyles";
import { View, Pressable } from "react-native";
import { GradientBorder } from "../../../ui/gradientBorder";
import { PlatformWrapperButton } from "../../../ui/platformWrapperButton";
import Icon from "../../../ui/icon";
import { COLORS } from "../../../../constants/theme";
import * as Haptics from "expo-haptics";

export const CaptureImageHeader = () => {
	return (
		<View style={styles.header}>
			<View style={styles.qualityWrapper}>
				<Pressable>
					<View style={styles.qualityButton}></View>
				</Pressable>
			</View>
			<Pressable onPress={() => Haptics.selectionAsync()}>
				<GradientBorder borderRadius={32} borderWidth={1}>
					<PlatformWrapperButton style={styles.menuButton}>
						<Icon icon='flashlight' size={26} color={COLORS.white} />
					</PlatformWrapperButton>
				</GradientBorder>
			</Pressable>
			<Pressable onPress={() => Haptics.selectionAsync()}>
				<GradientBorder borderRadius={32} borderWidth={1}>
					<PlatformWrapperButton style={styles.menuButton}>
						<Icon icon='audio' size={26} color={COLORS.white} />
					</PlatformWrapperButton>
				</GradientBorder>
			</Pressable>
		</View>
	);
};
