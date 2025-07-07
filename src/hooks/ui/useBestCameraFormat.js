import { useCameraDevice } from "react-native-vision-camera";
import { useMemo } from "react";
import useCaptureStore from "@stores/captureScreen";

const TARGET_WIDTH = 2560;
const TARGET_HEIGHT = 1440;

export default function useBestCameraFormat() {
	const formatIdx = useCaptureStore(s => s.format);
	const facing = useCaptureStore(s => s.facing);
	const aspect = useCaptureStore(s => s.aspect);
	const device = useCameraDevice(facing || "back");

	const format = useMemo(() => {
		if (!device?.formats?.length) return undefined;

		const isPhoto = formatIdx === 1;

		const getResolution = f => {
			if (isPhoto) {
				return f.photoWidth && f.photoHeight ? { width: f.photoWidth, height: f.photoHeight } : undefined;
			} else {
				return f.videoWidth && f.videoHeight ? { width: f.videoWidth, height: f.videoHeight } : undefined;
			}
		};

		const aspectRatioMatch = (width, height) => {
			const ratio = width / height;
			return Math.abs(ratio - 4 / 3) < 0.01;
		};

		const scoredFormats = device.formats
			.map(f => {
				const res = getResolution(f);
				if (!res) return null;

				if (aspect && !aspectRatioMatch(res.width, res.height)) return null;

				const dx = res.width - TARGET_WIDTH;
				const dy = res.height - TARGET_HEIGHT;
				const distanceSq = dx * dx + dy * dy;

				return { format: f, score: distanceSq };
			})
			.filter(Boolean);

		if (scoredFormats.length === 0) return undefined;

		scoredFormats.sort((a, b) => a.score - b.score);
		return scoredFormats[0].format;
	}, [device, formatIdx, aspect]);

	return format;
}
