import { useEffect } from "react";
import { getAverageColor } from "@somesoap/react-native-image-palette";
import toSafeFileUri from "@lib/toSafeFileUrl";
import useCaptureStore from "@stores/captureScreen";

const CameraSnapshotColor = ({ enabled, cameraRef }) => {
  const setColor = useCaptureStore((s) => s.setColor);

  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(async () => {
      try {
        const snap = await cameraRef.current?.takeSnapshot({ quality: 35 });
        if (!snap) return;
        const color = await getAverageColor(
          toSafeFileUri(`file://${snap.path}`),
          { pixelSpacingAndroid: 7 }
        );
        setColor(color);
      } catch {}
    }, 1000);
    return () => clearTimeout(id);
  }, [enabled]);

  return null;
};

export default CameraSnapshotColor;
