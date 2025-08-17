import { useEffect, forwardRef } from "react";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { View } from "tamagui";
import { Dimensions } from "react-native";

import useCaptureStore from "@stores/captureScreen";
import usePinchZoom from "@hooks/ui/usePinchZoom";
import useAppLifecycle from "@hooks/ui/useAppLifecycle";
import useCameraBlur from "@hooks/ui/useCameraBlur";
import useBestCameraFormat from "@hooks/ui/useBestCameraFormat";
import { normalSpring } from "@constants/easings";

import CameraOverlay from "./cameraOverlay";

const AnimatedCamera = Animated.createAnimatedComponent(Camera);
const AnimatedView = Animated.createAnimatedComponent(View);

const { width } = Dimensions.get("window");
const aspectWidth = width * (4 / 3);

const CaptureCamera = forwardRef(({ viewHeight }, ref) => {
  const formatIdx = useCaptureStore((s) => s.format);
  const facing = useCaptureStore((s) => s.facing);
  const aspect = useCaptureStore((s) => s.aspect);
  const setAspect = useCaptureStore((s) => s.setAspect);
  const content = useCaptureStore((s) => s.content);

  const device = useCameraDevice(facing || "front");
  const format = useBestCameraFormat();
  const active = useAppLifecycle();

  const zoom = useSharedValue(device.neutralZoom);
  const aspectValue = useSharedValue(0);
  const { gesture } = usePinchZoom({ device, zoom });

  const animatedProps = useAnimatedProps(() => ({ zoom: zoom.value }), [zoom]);

  const { applyCameraBlur, isBlurring, snapshotUri } = useCameraBlur({
    cameraRef: ref,
    zoom,
    device,
  });

  const animatedCameraWrapperStyle = useAnimatedStyle(() => ({
    height: interpolate(aspectValue.value, [0, 1], [viewHeight, aspectWidth]),
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

  return (
    <GestureDetector gesture={gesture}>
      <View
        f={1}
        justifyContent="center"
        alignItems="center"
      >
        <AnimatedView
          w={width}
          position="relative"
          overflow="hidden"
          style={animatedCameraWrapperStyle}
        >
          <CameraOverlay isBlurring={isBlurring} snapshotUri={snapshotUri} />
          <AnimatedCamera
            ref={ref}
            style={{ flex: 1 }}
            device={device}
            isActive={active && !content}
            format={format}
            audio={true}
            photoQualityBalance="balance"
            {...(formatIdx === 1 ? { photo: true } : { video: true })}
            animatedProps={animatedProps}
          />
        </AnimatedView>
      </View>
    </GestureDetector>
  );
});

export default CaptureCamera;
