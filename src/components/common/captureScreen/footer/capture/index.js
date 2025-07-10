import { XStack, View } from "tamagui";
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
import { getFadeIn, getFadeOut } from "@constants/fadeAnimations";

const AnimatedXStack = Animated.createAnimatedComponent(XStack);
const AnimatedView = Animated.createAnimatedComponent(View);

const CaptureFooter = () => {
  const recording = useCaptureStore((s) => s.recording);

  const recordingValue = useSharedValue(0);

  const animatedXStackStyles = useAnimatedStyle(() => ({
    opacity: interpolate(recordingValue.value, [0, 1], [1, 0.5]),
  }));

  useEffect(() => {
    recordingValue.value = withSpring(recording ? 1 : 0, normalSpring);
  }, [recording]);

  return (
    <AnimatedView entering={getFadeIn()} exiting={getFadeOut()}>
      <AnimatedXStack
        pointerEvents={recording ? "none" : "auto"}
        style={animatedXStackStyles}
        justifyContent="space-between"
        w="$full"
      >
        <CapturePickGalleryImage />
        <SwitchFormat />
        <CaptureRotateButton />
      </AnimatedXStack>
    </AnimatedView>
  );
};

export default CaptureFooter;
