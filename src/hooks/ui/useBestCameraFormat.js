import { useCameraDevice } from "react-native-vision-camera";
import { useMemo } from "react";
import useCaptureStore from "@stores/captureScreen";

const TARGET_WIDTH = 2560;
const TARGET_HEIGHT = 1440;

export default function useBestCameraFormat() {
  const formatIdx = useCaptureStore((s) => s.format);
  const facing = useCaptureStore((s) => s.facing);
  const device = useCameraDevice(facing || "back");

  const format = useMemo(() => {
    if (!device) return undefined;

    const isPhoto = formatIdx === 1;
    const formats = device.formats;

    const getResolution = (f) =>
      isPhoto ? f.photoResolution : f.videoResolution;

    const scoredFormats = formats
      .filter((f) => {
        const res = getResolution(f);
        return res?.width && res?.height;
      })
      .map((f) => {
        const res = getResolution(f);
        const dx = res.width - TARGET_WIDTH;
        const dy = res.height - TARGET_HEIGHT;
        const distanceSq = dx * dx + dy * dy;
        return { format: f, score: distanceSq };
      });

    if (scoredFormats.length === 0) return undefined;

    scoredFormats.sort((a, b) => a.score - b.score);
    return scoredFormats[0].format;
  }, [device, formatIdx]);

  return format;
}
