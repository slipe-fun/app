import { useState } from "react";

export default function useCameraBlur({ cameraRef, zoom, device }) {
	const [isBlurring, setIsBlurring] = useState(false);
	const [snapshotUri, setSnapshotUri] = useState(null);

	const applyCameraBlur = async () => {
		if (!cameraRef.current) return;
		zoom.value = device.neutralZoom;
		setIsBlurring(true);
		try {
			const result = await cameraRef?.current?.takeSnapshot({
				quality: 50,
			});
			setSnapshotUri(`file://${result.path}`);
		} finally {
			setTimeout(() => {
				setIsBlurring(false);
				setSnapshotUri(null);
			}, 1000);
		}
	};

	return { applyCameraBlur, isBlurring, snapshotUri };
}
