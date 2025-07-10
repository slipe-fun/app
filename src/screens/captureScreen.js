import { getVariableValue, YStack, View } from "tamagui";
import useInsets from "@hooks/ui/useInsets";
import CaptureCamera from "@components/common/captureScreen/captureCamera";
import CaptureFooter from "@components/common/captureScreen/footer/capture";
import CaptureFooterPublish from "@components/common/captureScreen/footer/publish";
import useCaptureStore from "@stores/captureScreen";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

const paddingVar = getVariableValue("$6", "space");
const heightVar = getVariableValue("$13", "size");

const CaptureScreen = () => {
  const insets = useInsets();
  const content = useCaptureStore((s) => s.content);
  const keyboard = useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
    isNavigationBarTranslucentAndroid: true,
  });

  const animatedYstackStyle = useAnimatedStyle(() => {
    const keyboardHeight = keyboard.height;
    return {
      paddingBottom: keyboardHeight.value > 0 ? paddingVar : insets.bottom,
      transform: [{ translateY: -keyboardHeight.value }],
    };
  });

  return (
    <AnimatedYStack
      f={1}
      backgroundColor="$bg"
      pt={insets.top}
      style={animatedYstackStyle}
    >
      <CaptureCamera />
      <View
        w="$full"
        gap="$6"
        justifyContent="flex-end"
        h={heightVar + paddingVar}
        ph="$6"
      >
        {content ? <CaptureFooterPublish /> : <CaptureFooter />}
      </View>
    </AnimatedYStack>
  );
};

export default CaptureScreen;
