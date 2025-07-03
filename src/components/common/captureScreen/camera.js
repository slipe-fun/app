import { Camera, useCameraDevice, useCameraFormat } from "react-native-vision-camera";
import Animated, { useSharedValue, useAnimatedProps, interpolate } from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useAppState } from "@react-native-community/hooks";
import { useRef, useState, useEffect, useMemo } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import useCameraBlur from "@hooks/useCameraBlur";
import { View } from "tamagui";

const AnimatedCamera = Animated.createAnimatedComponent(Camera);

const CaptureCamera = ({}) => {
	const [facing, setFacing] = useState("back");
	const cameraPermission = Camera.getCameraPermissionStatus();
	const device = useCameraDevice(facing);
	const cameraRef = useRef(null);
	const isFocused = useIsFocused();
	const [torch, setTorch] = useState("off");
	const zoom = useSharedValue(device.neutralZoom);
	const zoomOffset = useSharedValue(0);
	const animatedProps = useAnimatedProps(() => ({ zoom: zoom.value }), [zoom]);
	const appState = useAppState();
	const format = useCameraFormat(device, [{ photoResolution: { width: 1280, height: 720 } }]);
	const isActive = isFocused && appState === "active";
	const { applyCameraBlur, isBlurring, snapshotUri } = useCameraBlur({
		cameraRef,
		zoom,
		device,
		setFacing,
	});

	const gesture = useMemo(
		() =>
			Gesture.Pinch()
				.onBegin(() => {
					zoomOffset.value = zoom.value;
				})
				.onUpdate(({ scale }) => {
					const z = zoomOffset.value * scale;
					zoom.value = interpolate(z, [1, 15], [device.minZoom, device.maxZoom], "clamp");
				}),
		[device.minZoom, device.maxZoom, zoom, zoomOffset]
	);

	useEffect(() => {
		if (cameraPermission !== "granted") {
			Camera.requestCameraPermission();
		}
	}, []);

	const cameraStyles = useMemo(() => StyleSheet.create({ flex: 1 }));

	return (
		cameraPermission === "granted" && (
			<GestureDetector gesture={gesture}>
				<View f={1} br='$7' overflow='hidden'>
					<View
						position='absolute'
						top={0}
						left={0}
						right={0}
						bottom={0}
						br='$7'
						zIndex='$2'
						borderWidth={1}
						borderColor='rgba(255, 255, 255, 0.2)'
					/>
					<AnimatedCamera
						photoQualityBalance='balance'
						photo
						format={format}
						torch={torch}
						ref={cameraRef}
						animatedProps={animatedProps}
						style={cameraStyles}
						device={device}
						isActive={isActive}
					/>
				</View>
			</GestureDetector>
		)
	);
};

export default CaptureCamera;
