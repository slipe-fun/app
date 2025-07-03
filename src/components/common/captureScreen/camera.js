import { Camera, useCameraDevice, useCameraFormat } from "react-native-vision-camera";
import Animated, { useSharedValue, useAnimatedProps, interpolate } from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useAppState } from "@react-native-community/hooks";
import { useRef, useState, useEffect, useMemo } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import useCameraBlur from "@hooks/useCameraBlur";

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

	const gesture = Gesture.Pinch()
		.onBegin(() => {
			zoomOffset.value = zoom.value;
		})
		.onUpdate(event => {
			const z = zoomOffset.value * event.scale;
			zoom.value = interpolate(z, [1, 15], [device.minZoom, device.maxZoom], 'clamp');
		});

	useEffect(() => {
		if (cameraPermission !== "granted") {
			Camera.requestCameraPermission();
		}
	}, []);

	const cameraStyles = useMemo(() => StyleSheet.create({ flex: 1 }));

	return (
		cameraPermission === "granted" && (
			<GestureDetector gesture={gesture}>
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
			</GestureDetector>
		)
	);
};

export default CaptureCamera;
