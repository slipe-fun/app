import { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { useCameraBlur } from "../../../../hooks/useCameraBlur";
import { styles } from "./styles/captureImageStyles";
import { GradientBorder } from "../../../ui/gradientBorder";
import { CaptureImageFooter } from "./footer";
import { CaptureImageHeader } from "./header";
import { useIsFocused } from "@react-navigation/native";
import { useAppState } from "@react-native-community/hooks";
import Reanimated, { useAnimatedProps, useSharedValue, interpolate, Extrapolation } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Camera, useCameraDevice, useCameraFormat } from "react-native-vision-camera";
import BlobUtil from "react-native-blob-util";
import { useDispatch, useSelector } from "react-redux";
import { selectImage, updateCameraState } from "../../../../reducers/publishScreen";

Reanimated.addWhitelistedNativeProps({
	zoom: true,
});

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

export const CaptureImage = () => {
	const [facing, setFacing] = useState("back");
	const device = useCameraDevice(facing || "back");
	const cameraPermission = Camera.getCameraPermissionStatus();
	const zoomOffset = useSharedValue(0);
	const image = useSelector(selectImage);
	const dispatch = useDispatch();
	const zoom = useSharedValue(device.neutralZoom);
	const animatedProps = useAnimatedProps(() => ({ zoom: zoom.value }), [zoom]);
	const [torch, setTorch] = useState("off");
	const [mute, setMute] = useState(false);
	const cameraRef = useRef(null);
	const format = useCameraFormat(device, [{ photoResolution: { width: 1280, height: 720 } }]);
	const isFocused = useIsFocused()
	const appState = useAppState()
	const isActive = isFocused && appState === "active" || image === ""

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
		const absolutePath = file.path;
		const base64Data = await BlobUtil.fs.readFile(absolutePath, "base64");
		dispatch(updateCameraState({ image: `data:${file.mimeType || "image/jpeg"};base64,${base64Data}` }));
	};

	useEffect(() => {
		if (cameraPermission !== "granted") {
			Camera.requestCameraPermission();
		}
	}, []);

	return (
		<GradientBorder
			style={styles.captureImage}
			borderRadius={14}
			gradientColors={["rgba(255, 255, 255, 0.18)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.18)"]}
			borderWidth={1}
		>
			
			<GestureDetector gesture={gesture}>
				<View style={styles.zoomDetector} />
			</GestureDetector>
			<ReanimatedCamera
				photoQualityBalance='speed'
				photo
				format={format}
				torch={torch}
				ref={cameraRef}
				animatedProps={animatedProps}
				style={styles.cameraView}
				device={device}
				isActive={isActive}
			/>
			{image !== "" && <Image fadeDuration={175} style={styles.cameraLoader} source={{ uri: image }} />}
			{isBlurring && snapshotUri && <Image fadeDuration={175} source={{ uri: snapshotUri }} style={styles.cameraLoader} blurRadius={8} />}
			<CaptureImageFooter capturePhoto={capturePhoto} applyStaticBlur={applyCameraBlur} />
			<CaptureImageHeader setTorch={setTorch} setMute={setMute} mute={mute} torch={torch} />
		</GradientBorder>
	);
};
