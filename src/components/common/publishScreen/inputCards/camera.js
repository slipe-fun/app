import { useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { GradientBorder } from "../../../ui/gradientBorder";
import { styles } from "../styles/inputCardsStyles";
import { Text, Pressable, View, StyleSheet } from "react-native";
import Icon from "../../../ui/icon";
import { COLORS } from "../../../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useCameraFlip } from "../../../../hooks/useCameraFlip";

export const CameraInputCard = ({ result }) => {
	const [permission, requestPermission] = useCameraPermissions();
	const opacity = useSharedValue(0);

	const { facing, cameraViewStyle, composedGesture } = useCameraFlip("front");

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});
	return (
		<GestureDetector gesture={composedGesture}>
			<View style={[{ flex: 1 }, animatedStyle]}>
				{permission?.granted ? (
					<GradientBorder
						style={styles.inputCard}
						borderRadius={16}
						gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
						borderWidth={1}
					>
						<CameraView style={[styles.cameraView, cameraViewStyle]} facing={facing} key={facing} mode='video' />
						<View style={styles.inputCardHeader}>
							<LinearGradient
								colors={["rgba(0, 0, 0, 0.32)", "rgba(0, 0, 0, 0)"]}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								style={styles.gradient}
							/>
							<View style={styles.inputCardHeaderBlock}>
								<Icon icon='camera' size={36} color={COLORS.transparentIcon} />
								<View style={styles.bigIconWrapper}>
									<Icon icon='arrowRightUp' size={27} color={COLORS.transparentIcon} />
								</View>
							</View>
						</View>
						<View style={styles.inputCardFooter}>
							<LinearGradient
								colors={["rgba(0, 0, 0, 0.32)", "rgba(0, 0, 0, 0)"]}
								start={{ x: 0.5, y: 1 }}
								end={{ x: 0.5, y: 0 }}
								style={styles.gradient}
							/>
							<View style={styles.inputCardFooterBlock}>
								<Text style={styles.footerBlockTitle}>Via camera</Text>
								<Text style={styles.footerBlockSubtitle}>Swipe right/left to change view</Text>
							</View>
						</View>
					</GradientBorder>
				) : (
					<GradientBorder
						style={styles.inputCard}
						borderRadius={16}
						gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
						borderWidth={1}
					>
						<View style={styles.permissionContainer}>
							<Pressable style={styles.permissionWrapper} onPress={requestPermission}>
								<Text style={styles.permissionMessage}>We need your permission to show the camera. Tap to access</Text>
							</Pressable>
						</View>
					</GradientBorder>
				)}
			</View>
		</GestureDetector>
	);
};
