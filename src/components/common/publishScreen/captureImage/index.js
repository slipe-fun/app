import { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { useCameraBlur } from "../../../../hooks/useCameraBlur";
import { styles } from "../styles/captureImageStyles";
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

	const { applyCameraBlur, isBlurring, snapshotUri } = useCameraBlur({
		cameraRef,
		zoom,
		zoomOffset,
		device,
		setFacing,
	});

	const gesture = Gesture.Pinch()
		.onBegin(() => {
			zoomOffset.value = zoom.value;
		})
		.onUpdate(event => {
			const z = zoomOffset.value * event.scale;
			zoom.value = interpolate(z, [1, 15], [device.minZoom, device.maxZoom], Extrapolation.CLAMP);
		});

	const capturePhoto = async () => {
		const file = await cameraRef.current.takePhoto();
		const result = await fetch(`file://${file.path}`);
		const data = await result.blob();
		console.log(data);
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
				<View style={styles.zoomDetector}/>
			</GestureDetector>
				<ReanimatedCamera
					photo
					torch={torch}
					ref={cameraRef}
					animatedProps={animatedProps}
					style={styles.cameraView}
					device={device}
					isActive={true}
				/>
			{isBlurring && snapshotUri && <Image fadeDuration={175} source={{ uri: snapshotUri }} style={styles.cameraLoader} blurRadius={8} />}
			<CaptureImageFooter capturePhoto={capturePhoto} applyStaticBlur={applyCameraBlur} />
			<CaptureImageHeader setTorch={setTorch} setMute={setMute} mute={mute} torch={torch} />
		</GradientBorder>
	);
};
