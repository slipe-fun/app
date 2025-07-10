import { XStack } from "tamagui";
import Animated from "react-native-reanimated";
import { getFadeIn, getFadeOut } from "@constants/fadeAnimations";
import CaptureFooterPublishButton from "./publishButton";
import CaptureFooterPublishInput from "./input";

const AnimatedXStack = Animated.createAnimatedComponent(XStack);

const CaptureFooterPublish = () => {

  return (
      <AnimatedXStack
        entering={getFadeIn()} exiting={getFadeOut()}
        gap="$6"
        w="$full"
      >
        <CaptureFooterPublishInput/>
        <CaptureFooterPublishButton/>
      </AnimatedXStack>
  );
};

export default CaptureFooterPublish;
