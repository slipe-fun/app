import { useMemo } from "react";
import { interpolate, useSharedValue } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";

const usePinchZoom = ({ device, zoom }) => {
  const offset = useSharedValue(0);

  const gesture = useMemo(
    () =>
      Gesture.Pinch()
        .onBegin(() => {
          offset.value = zoom.value;
        })
        .onUpdate(({ scale }) => {
          const z = offset.value * scale;
          zoom.value = interpolate(
            z,
            [1, 15],
            [device.minZoom, device.maxZoom],
            "clamp"
          );
        }),
    [device.minZoom, device.maxZoom, zoom, offset]
  );

  return { gesture };
}

export default usePinchZoom;

