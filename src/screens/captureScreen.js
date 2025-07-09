import { getVariableValue, YStack, View } from "tamagui";
import useInsets from "@hooks/ui/useInsets";
import CaptureCamera from "@components/common/captureScreen/captureCamera";
import CaptureFooter from "@components/common/captureScreen/footer/capture";
import CaptureFooterPublish from "@components/common/captureScreen/footer/publish";
import useCaptureStore from "@stores/captureScreen";
import Animated, {
  interpolate,
  useAnimatedKeyboard,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { fastSpring } from "@constants/easings";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedView = Animated.createAnimatedComponent(View);

const paddingBottomVar = getVariableValue("$6", "space");

const CaptureScreen = () => {
  const insets = useInsets();
  const content = useCaptureStore((s) => s.content);
  const keyboard = useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
    isNavigationBarTranslucentAndroid: true,
  });

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }],
    };
  });

  const AnimatedYStackStyle = useAnimatedStyle(() => {
    const keyboardHeight = keyboard.height;
    return {
      paddingBottom: withSpring(
        keyboardHeight.value > 0 ? paddingBottomVar : insets.bottom,
        fastSpring
      ),
    };
  });

  return (
    <AnimatedView
      f={1} 
      backgroundColor="$bg"
      pt={insets.top}
      style={animatedViewStyle}
    >
      <AnimatedYStack flexDirection="column" f={1} style={AnimatedYStackStyle}>
        <CaptureCamera />
        {content ? <CaptureFooterPublish /> : <CaptureFooter />}
      </AnimatedYStack>
    </AnimatedView>
  );
};

export default CaptureScreen;
