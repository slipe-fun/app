import { useEffect, useRef, useState } from "react";
import { View, Image } from "react-native";
import { styles } from "../styles/captureImageStyles";
import { captureRef } from "react-native-view-shot";
import { GradientBorder } from "../../../ui/gradientBorder";
import { CaptureImageFooter } from "./footer";
import { CaptureImageHeader } from "./header";
import Reanimated, { useAnimatedProps, useSharedValue, interpolate, Extrapolation } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Camera, useCameraDevice } from "react-native-vision-camera";

Reanimated.addWhitelistedNativeProps({
	zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

export const CaptureImage = () => {
	const [facing, setFacing] = useState("back");
	const device = useCameraDevice(facing || "back");
	const cameraPermission = Camera.getCameraPermissionStatus();
	const zoomOffset = useSharedValue(0);
	const zoom = useSharedValue(device.neutralZoom);
	const animatedProps = useAnimatedProps(() => ({ zoom: zoom.value }), [zoom]);
	const [torch, setTorch] = useState("off");
	const [mute, setMute] = useState(false);
	const cameraRef = useRef(null);
	const [snapshotUri, setSnapshotUri] = useState(null);
	const [isBlurring, setIsBlurring] = useState(false);

	const gesture = Gesture.Pinch()
		.onBegin(() => {
			zoomOffset.value = zoom.value;
		})
		.onUpdate(event => {
			const z = zoomOffset.value * event.scale;
			zoom.value = interpolate(z, [1, 10], [device.minZoom, device.maxZoom], Extrapolation.CLAMP);
		});

	const applyStaticBlur = async () => {
		if (!cameraRef.current) return;
		zoom.value = 0;
		setIsBlurring(true);
		try {
			const result = await captureRef(cameraRef?.current, {
				result: "data-uri",
				handleGLSurfaceViewOnAndroid: true,
				quality: 0.1,
				format: "jpg",
				width: Math.round(500 * 0.25),
				height: Math.round(800 * 0.25),
			});

			setSnapshotUri(result);
			setFacing(prev => (prev === "front" ? "back" : "front"));
		} catch (e) {
			console.error("Error in applyStaticBlur:", e);
		} finally {
			setTimeout(() => {
				setIsBlurring(false);
				setSnapshotUri(null);
			}, 1000);
		}
	};

	useEffect(() => {
		if (cameraPermission !== "granted") {
			Camera.requestCameraPermission();
		}
	}, []);

	return (
		<GradientBorder
			style={styles.captureImage}
			borderRadius={20}
			gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
			borderWidth={1}
		>
			<GestureDetector gesture={gesture}>
				<ReanimatedCamera
					video
					torch={torch}
					ref={cameraRef}
					animatedProps={animatedProps}
					style={styles.cameraView}
					device={device}
					isActive={true}
				/>
			</GestureDetector>
			{isBlurring && snapshotUri && <Image fadeDuration={175} source={{ uri: snapshotUri }} style={styles.cameraLoader} blurRadius={8} />}
			<CaptureImageFooter applyStaticBlur={applyStaticBlur} />
			<CaptureImageHeader setTorch={setTorch} setMute={setMute} mute={mute} torch={torch} />
		</GradientBorder>
	);
};
