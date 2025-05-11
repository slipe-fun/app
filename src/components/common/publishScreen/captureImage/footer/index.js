import { View } from "react-native";
import { MediaGalleryButton } from "./galleryButton";
import { RotateButton } from "./rotateButton";
import { CaptureButton } from "./captureButton";
import { styles } from "../../styles/captureImageStyles";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { selectImage } from "../../../../../reducers/publishScreen";

export const CaptureImageFooter = ({ applyStaticBlur, onGalleryPress, capturePhoto }) => {
	const image = useSelector(selectImage);

	return (
		<>
			{image === "" && (
				<Animated.View
					exiting={FadeOutDown.duration(250)}
					entering={FadeInUp.duration(250)}
					style={styles.footer}
				>
						<View style={styles.footerBlock}>
							<RotateButton applyStaticBlur={applyStaticBlur} />
						</View>
						<View style={styles.footerBlock}>
							<CaptureButton capturePhoto={capturePhoto} />
						</View>
						<View style={styles.footerBlock}>
							<MediaGalleryButton onGalleryPress={onGalleryPress} />
						</View>
				</Animated.View>
			)}
		</>
	);
};
