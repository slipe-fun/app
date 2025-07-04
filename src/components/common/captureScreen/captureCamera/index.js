import { useRef, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from "react-native-vision-camera";
import { View } from "tamagui";

import useCaptureStore from "@stores/captureScreen";
import useCameraPermission from "@hooks/ui/useCameraPermission";
import usePinchZoom from "@hooks/ui/usePinchZoom";
import useAppLifecycle from "@hooks/ui/useAppLifecycle";
import useCameraBlur from "@hooks/ui/useCameraBlur";

import CameraOverlay from "./cameraOverlay";
import CameraSnapshotColor from "./cameraSnapshotColor";

const AnimatedCamera = Animated.createAnimatedComponent(Camera);
const styles = StyleSheet.create({ flex: 1 });

const CaptureCamera = () => {
  const [init, setInit] = useState(false);

  const formatIdx = useCaptureStore((s) => s.format);
  const facing = useCaptureStore((s) => s.facing);
  const device = useCameraDevice(facing || "back");

  const active = useAppLifecycle();

  const zoom = useSharedValue(device.neutralZoom);
  const { gesture } = usePinchZoom({ device, zoom });
  const animatedProps = useAnimatedProps(() => ({ zoom: zoom.value }), [zoom]);

  const camRef = useRef(null);
  const permission = useCameraPermission();

  const format = useCameraFormat(
    device,
    formatIdx === 1
      ? [{ photoResolution: { width: 1280, height: 720 } }]
      : [{ videoResolution: { width: 1280, height: 720 }, fps: 60 }]
  );

  const { applyCameraBlur, isBlurring, snapshotUri } = useCameraBlur({
    cameraRef: camRef,
    zoom,
    device,
  });

  useEffect(() => {
    applyCameraBlur();
  }, [facing, formatIdx]);

  return (
    permission === "granted" && (
      <GestureDetector gesture={gesture}>
        <View f={1} br="$7" overflow="hidden">
          <CameraOverlay isBlurring={isBlurring} snapshotUri={snapshotUri} />
          <CameraSnapshotColor enabled={init} cameraRef={camRef} />
          <AnimatedCamera
            ref={camRef}
            style={styles}
            device={device}
            isActive={active}
            pixelFormat="rgb"
            format={format}
            photoQualityBalance="balance"
            {...(formatIdx === 1 ? { photo: true } : { video: true })}
            animatedProps={animatedProps}
            onInitialized={() => setInit(true)}
          />
        </View>
      </GestureDetector>
    )
  );
};

export default CaptureCamera;
