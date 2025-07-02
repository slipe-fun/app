import { useState } from "react";
import { captureRef } from "react-native-view-shot";

export default function useCameraBlur({ cameraRef, zoom, device, setFacing }) {
	const [isBlurring, setIsBlurring] = useState(false);
	const [snapshotUri, setSnapshotUri] = useState(null);

	const applyCameraBlur = async () => {
		if (!cameraRef.current) return;
		zoom.value = device.neutralZoom;
		setIsBlurring(true);
		try {
			const result = await captureRef(cameraRef.current, {
				result: "data-uri",
				handleGLSurfaceViewOnAndroid: true,
				quality: 0.1,
				format: "jpg",
				width: Math.round(500 * 0.25),
				height: Math.round(800 * 0.25),
			});

			setSnapshotUri(result);
			setFacing(prev => (prev === "front" ? "back" : "front"));
		} finally {
			setTimeout(() => {
				setIsBlurring(false);
				setSnapshotUri(null);
			}, 1000);
		}
	};

	return { applyCameraBlur, isBlurring, snapshotUri };
}
