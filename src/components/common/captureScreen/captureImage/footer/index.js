import { View } from "react-native";
import AnimatedButton from "@components/ui/animatedButton";
import { MediaGalleryButton } from "./galleryButton";
import { RotateButton } from "./rotateButton";
import { CaptureButton } from "./captureButton";
import { styles } from "../styles/captureImageStyles";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { selectImage, updateCameraState } from "../../../../../reducers/publishScreen";
import { useNavigation } from "@react-navigation/native";

export const CaptureImageFooter = ({ applyStaticBlur, onGalleryPress, capturePhoto }) => {
	const image = useSelector(selectImage);
	const dispatch = useDispatch()
	const navigation = useNavigation()

	return (
		<>
			{image === "" ? (
				<Animated.View
				key='footer-1'
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
			) : (
				<Animated.View exiting={FadeOutDown.duration(250)}
				entering={FadeInUp.duration(250)} key='footer-2' style={styles.confirmFooter}>
					<AnimatedButton haptics key='footer-button-1' style={styles.confirmButton} size={26} iconName='x' onToggle={() => dispatch(updateCameraState({image: ""}))} />
					<AnimatedButton haptics key='footer-button-2' style={styles.confirmButton} size={28} iconName='checkmark' onToggle={() => navigation.navigate("Publish_Editor")} />
				</Animated.View>
			)}
		</>
	);
};
