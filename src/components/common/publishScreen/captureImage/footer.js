import { styles } from "../styles/captureImageStyles";
import { View, Pressable } from "react-native";
import { GradientBorder } from "../../../ui/gradientBorder";
import { PlatformWrapperButton } from "../../../ui/platformWrapperButton";
import Icon from "../../../ui/icon";
import { COLORS } from "../../../../constants/theme";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";
import * as MediaLibrary from "expo-media-library";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveFacing, updateCameraFacing } from "../../../../reducers/publishScreen";

export const CaptureImageFooter = () => {
	const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
	const [photo, setPhoto] = useState();
    const dispatch = useDispatch();
    const facing = useSelector(selectActiveFacing);
	const rotation = useSharedValue(0);
	const [isDisabled, setIsDisabled] = useState(false);

	useEffect(() => {
		const loadPhotos = async () => {
			if (permissionResponse?.granted) {
				const media = await MediaLibrary.getAssetsAsync({
					mediaType: [MediaLibrary.MediaType.photo],
					first: 1,
					sortBy: [[MediaLibrary.SortBy.creationTime, false]],
				});
				setPhoto(media.assets[0] ?? null);
			} else {
				setPhoto(null);
			}
		};
		loadPhotos();
	}, [permissionResponse?.granted]);

	useEffect(() => {
		requestPermission();
	}, []);

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	const changeFacing = () => {
		if (isDisabled) return;
		setIsDisabled(true);
        const newFacing = facing === 'front' ? 'back' : 'front';
        dispatch(updateCameraFacing({ facing: newFacing }))
		rotation.value = withSpring(
			rotation.value + 360,
			{
				damping: 10,
				stiffness: 100,
				mass: 1,
				overshootClamping: false,
				restDisplacementThreshold: 0.01,
				restSpeedThreshold: 0.01,
			},
			() => runOnJS(setIsDisabled)(false)
		);
	};

	return (
		<View style={styles.footer}>
			<LinearGradient colors={["rgba(0, 0, 0, 0.32)", "rgba(0, 0, 0, 0)"]} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} style={styles.gradient} />
			<View style={styles.footerWrapper}>
				<View style={styles.footerBlock}>
					<Pressable onPress={changeFacing} disabled={isDisabled}>
						<GradientBorder borderRadius={32} borderWidth={1}>
							<PlatformWrapperButton style={styles.menuButton}>
								<Animated.View style={animatedStyles}>
									<Icon icon='circleArrow' size={32} color={COLORS.white} />
								</Animated.View>
							</PlatformWrapperButton>
						</GradientBorder>
					</Pressable>
				</View>

				<View style={styles.footerBlock}>
					<Pressable onPress={() => {}}>
						<View style={styles.captureButton}>
							<View style={styles.captureButtonInside} />
						</View>
					</Pressable>
				</View>

				<View style={styles.footerBlock}>
					<Pressable onPress={() => {}}>
						<GradientBorder borderRadius={32} borderWidth={1}>
							{photo && <Image key={photo.id} source={{ uri: photo.uri }} style={styles.menuButton} resizeMode='cover' />}
						</GradientBorder>
					</Pressable>
				</View>
			</View>
		</View>
	);
};
