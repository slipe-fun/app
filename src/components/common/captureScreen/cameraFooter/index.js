import { View, XStack, YStack } from "tamagui";
import CaptureButton from "./captureButton";
import AspectButton from "./aspectButton";
import CaptureRecordingTimer from "./recordingTimer";
import { useRef, useState, useEffect } from "react";
import Animated from "react-native-reanimated";
import { getFadeInSimple, getFadeOutSimple } from "@constants/fadeAnimations";
import useCaptureStore from "@stores/captureScreen";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

const CaptureCameraFooter = ({ cameraRef }) => {
  const ref = useRef(null);
  const [viewHeight, setViewHeight] = useState(0);

  const content = useCaptureStore((s) => s.content);

  useEffect(() => {
    setViewHeight(ref.current?.getBoundingClientRect()?.height);
  }, []);

  return (
    !content ? (
      <AnimatedYStack
      position="absolute"
      bottom={0}
      left={0}
      exiting={getFadeOutSimple()}
      entering={getFadeInSimple()}
      right={0}
      justifyContent=""
      alignItems="center"
      zIndex="$2"
      overflow="visible"
      w="$full"
      ph="$6.5"
    >
      <CaptureRecordingTimer viewHeight={viewHeight} />
      <XStack ref={ref} pv="$8" pt="$6" w="$full" flexDirection="row">
        <View flex={1} justifyContent="center" alignItems="center" />
        <CaptureButton cameraRef={cameraRef} />
        <AspectButton />
      </XStack>
    </AnimatedYStack>
  ) : null
  );
};

export default CaptureCameraFooter;
