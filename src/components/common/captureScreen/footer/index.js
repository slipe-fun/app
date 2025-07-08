import useInsets from "@hooks/ui/useInsets";
import { XStack } from "tamagui";
import CapturePickGalleryImage from "./pickGalleryImage";
import CaptureRotateButton from "./rotateButton";
import SwitchFormat from "./formatSwitcher";
import Animated, {
  interpolate,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import useCaptureStore from "@stores/captureScreen";
import { useEffect } from "react";
import { normalSpring } from "@constants/easings";

const AnimatedXStack = Animated.createAnimatedComponent(XStack);

const CaptureFooter = () => {
  const insets = useInsets();
  const recording = useCaptureStore((s) => s.recording);

  const recordingValue = useSharedValue(0);

  const animatedXStackStyles = useAnimatedStyle(() => ({
    opacity: interpolate(recordingValue.value, [0, 1], [1, 0.5]),
  }));

  useEffect(() => {
    recordingValue.value = withSpring(recording ? 1 : 0, normalSpring);
  }, [recording]);

  return (
    <AnimatedXStack
      pointerEvents={recording ? "none" : "auto"}
      style={animatedXStackStyles}
      pb={insets.bottom}
      justifyContent="space-between"
      pt="$6"
      ph="$7"
      w="$full"
    >
      <CapturePickGalleryImage />
      <SwitchFormat />
      <CaptureRotateButton />
    </AnimatedXStack>
  );
};

export default CaptureFooter;
