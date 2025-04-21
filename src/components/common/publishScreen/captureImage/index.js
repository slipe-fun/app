import { useRef, useState } from "react";
import { View, Image, PixelRatio } from "react-native";
import { CameraView } from "expo-camera";
import { styles } from "../styles/captureImageStyles";
import { captureRef } from "react-native-view-shot";
import { CaptureImageFooter } from "./footer";
import { CaptureImageHeader } from "./header";

export const CaptureImage = () => {
	const [facing, setFacing] = useState("back");
	const [torch, setTorch] = useState(true);
	const [mute, setMute] = useState(false);
	const cameraRef = useRef(null);
	const [snapshotUri, setSnapshotUri] = useState(null);
	const [isBlurring, setIsBlurring] = useState(false);
	const [cameraLayout, setCameraLayout] = useState({ width: 0, height: 0 });
	const [cameraReady, setCameraReady] = useState(false);

	const applyStaticBlur = async () => {
		setCameraReady(false);
		const result = await captureRef(cameraRef?.current, {
			result: "data-uri",
			handleGLSurfaceViewOnAndroid: true,
			quality: 0.3,
			format: "jpg",
			width: Math.round(cameraLayout.width * 0.25),
            height: Math.round(cameraLayout.height * 0.25),
		}).then(data => {
			setIsBlurring(true);
			setSnapshotUri(data);
			setFacing(prev => prev === "front" ? "back" : "front");
		});
		if (cameraReady) {
			setTimeout(() => {
				setIsBlurring(false);
				setSnapshotUri(null);
			}, 1250);
		}
	};

	const handleLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setCameraLayout({ width, height });
    };

	return (
		<View style={styles.captureImage}>
			<CameraView
				onLayout={handleLayout}
				ref={cameraRef}
				style={styles.cameraView}
				onCameraReady={() => setCameraReady(true)}
				enableTorch={torch}
				mute={mute}
				facing={facing}
				mode='picture'
			/>
			{isBlurring && <Image fadeDuration={175} source={{ uri: snapshotUri }} style={styles.cameraLoader} blurRadius={8} />}
			<CaptureImageFooter applyStaticBlur={() => applyStaticBlur()} />
			<CaptureImageHeader setTorch={setTorch} setMute={setMute} mute={mute} torch={torch} />
		</View>
	);
};
