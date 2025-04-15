import { useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { GradientBorder } from "../../../ui/gradientBorder";
import { styles } from "../styles/inputCardsStyles";
import { Text, Pressable, View, StyleSheet } from "react-native";
import Icon from "../../../ui/icon";
import { COLORS } from "../../../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useCameraFlip } from "../../../../hooks/changeCameraFacing";

export const CameraInputCard = ({ result }) => {
	const [permission, requestPermission] = useCameraPermissions();
	const opacity = useSharedValue(0);

	const { facing, flipAnimatedStyle, cameraViewStyle, composedGesture } = useCameraFlip("front");

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});

	useEffect(() => {
		opacity.value = withTiming(1, { duration: 300 });
		return () => {
			opacity.value = withTiming(0, { duration: 300 });
		};
	}, []);

	return (
		<GestureDetector gesture={composedGesture}>
			<Animated.View style={[{ flex: 1 }, animatedStyle]}>
				{permission?.granted ? (
					<View style={styles.inputCard}>
						<Animated.View style={[styles.cameraContainer, flipAnimatedStyle]}>
							<CameraView style={[styles.cameraView, cameraViewStyle]} facing={facing} key={facing} />
						</Animated.View>
						<View style={StyleSheet.absoluteFillObject} pointerEvents='box-none'>
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
						</View>
					</View>
				) : (
					<GradientBorder
						style={styles.inputCard}
						borderRadius={16}
						gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
						borderWidth={1}
					>
						<Animated.View style={[styles.permissionContainer, animatedStyle]}>
							<Pressable style={styles.permissionWrapper} onPress={requestPermission}>
								<Text style={styles.permissionMessage}>We need your permission to show the camera</Text>
							</Pressable>
						</Animated.View>
					</GradientBorder>
				)}
			</Animated.View>
		</GestureDetector>
	);
};
