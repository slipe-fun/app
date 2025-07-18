import { useRef, useState, useEffect } from "react";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { View, YStack } from "tamagui";

import useCaptureStore from "@stores/captureScreen";
import usePinchZoom from "@hooks/ui/usePinchZoom";
import useAppLifecycle from "@hooks/ui/useAppLifecycle";
import useCameraBlur from "@hooks/ui/useCameraBlur";
import useBestCameraFormat from "@hooks/ui/useBestCameraFormat";

import CameraOverlay from "./cameraOverlay";
import CameraSnapshotColor from "./cameraSnapshotColor";
import CaptureCameraFooter from "../cameraFooter";
import CaptureCameraResult from "./result";
import { normalSpring } from "@constants/easings";
import { Dimensions } from "react-native";
import CaptureCameraHeader from "../cameraHeader";

const AnimatedCamera = Animated.createAnimatedComponent(Camera);
const AnimatedView = Animated.createAnimatedComponent(View);
const { width } = Dimensions.get("window");
const aspectWidth = width * (4 / 3);

const CaptureCamera = () => {
  const [init, setInit] = useState(false);
  const [viewHegiht, setViewHeight] = useState(0);

  const formatIdx = useCaptureStore((s) => s.format);
  const facing = useCaptureStore((s) => s.facing);
  const aspect = useCaptureStore((s) => s.aspect);
  const setAspect = useCaptureStore((s) => s.setAspect);
  const device = useCameraDevice(facing || "back");
  const content = useCaptureStore((s) => s.content);

  const active = useAppLifecycle();

  const zoom = useSharedValue(device.neutralZoom);
  const aspectValue = useSharedValue(0);
  const { gesture } = usePinchZoom({ device, zoom });
  const animatedProps = useAnimatedProps(() => ({ zoom: zoom.value }), [zoom]);

  const camRef = useRef(null);
  const ref = useRef(null);
  const format = useBestCameraFormat();

  const { applyCameraBlur, isBlurring, snapshotUri } = useCameraBlur({
    cameraRef: camRef,
    zoom,
    device,
  });

  const animatedCameraWrapperStyle = useAnimatedStyle(() => ({
    height: interpolate(aspectValue.value, [0, 1], [viewHegiht, aspectWidth]),
  }));

  useEffect(() => {
    applyCameraBlur();
  }, [facing, formatIdx, aspect]);

  useEffect(() => {
    if (formatIdx === 1) {
      aspectValue.value = withSpring(aspect ? 1 : 0, normalSpring);
    } else {
      setAspect(false);
      aspectValue.value = withSpring(0, normalSpring);
    }
  }, [aspect, formatIdx]);

  useEffect(() => {
    setViewHeight(ref.current?.getBoundingClientRect()?.height);
  }, []);

  return (
    <YStack
      ref={ref}
      f={1}
      br="$7"
      position="relative"
      justifyContent="center"
      overflow="hidden"
    >
      <GestureDetector gesture={gesture}>
        <>
          <View
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            br="$7"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.2)"
            zIndex="$2"
          />
          <CaptureCameraResult />
          <CaptureCameraHeader />
          <AnimatedView
            w={width}
            position="relative"
            overflow="hidden"
            style={animatedCameraWrapperStyle}
          >
            <CameraOverlay isBlurring={isBlurring} snapshotUri={snapshotUri} />
            <CameraSnapshotColor enabled={init} cameraRef={camRef} />
            <AnimatedCamera
              ref={camRef}
              style={{ flex: 1 }}
              device={device}
              isActive={active && !content}
              format={format}
              audio={true}
              photoQualityBalance="balance"
              {...(formatIdx === 1 ? { photo: true } : { video: true })}
              animatedProps={animatedProps}
              onInitialized={() => setInit(true)}
            />
          </AnimatedView>
        </>
      </GestureDetector>
      <CaptureCameraFooter cameraRef={camRef} />
    </YStack>
  );
};

export default CaptureCamera;
