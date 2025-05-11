import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MediaGalleryButton } from "./galleryButton";
import { RotateButton } from "./rotateButton";
import { CaptureButton } from "./captureButton";
import { styles } from "../../styles/captureImageStyles";

export const CaptureImageFooter = ({ applyStaticBlur, onGalleryPress, capturePhoto }) => {
	return (
		<View style={styles.footer}>
			<LinearGradient colors={["rgba(0, 0, 0, 0.32)", "rgba(0, 0, 0, 0)"]} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} style={styles.gradient} />
			<View style={styles.footerWrapper}>
				<View style={styles.footerBlock}>
					<RotateButton applyStaticBlur={applyStaticBlur} />
				</View>
				<View style={styles.footerBlock}>
					<CaptureButton capturePhoto={capturePhoto} />
				</View>
				<View style={styles.footerBlock}>
					<MediaGalleryButton onGalleryPress={onGalleryPress} />
				</View>
			</View>
		</View>
	);
};
