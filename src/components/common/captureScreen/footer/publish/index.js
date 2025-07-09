import useInsets from "@hooks/ui/useInsets";
import { XStack } from "tamagui";
import Animated from "react-native-reanimated";
import { getFadeIn, getFadeOut } from "@constants/fadeAnimations";
import CaptureFooterPublishButton from "./publishButton";

const AnimatedXStack = Animated.createAnimatedComponent(XStack);

const CaptureFooterPublish = () => {
  const insets = useInsets();

  return (
      <AnimatedXStack
        entering={getFadeIn()} exiting={getFadeOut()}
        pb={insets.bottom}
        gap="$7"
        pt="$6"
        ph="$7"
        w="$full"
      >
        <CaptureFooterPublishButton/>
      </AnimatedXStack>
  );
};

export default CaptureFooterPublish;
