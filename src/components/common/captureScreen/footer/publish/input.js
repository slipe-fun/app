import { View, Input, Text } from "tamagui";
import Animated from "react-native-reanimated";
import { getCharEnter, getCharExit } from "@constants/fadeAnimations";
import useCaptureStore from "@stores/captureScreen";

const AnimatedText = Animated.createAnimatedComponent(Text);

const CaptureFooterPublishInput = () => {
  const postName = useCaptureStore((s) => s.postName);
  const setPostName = useCaptureStore((s) => s.setPostName);

  return (
      <View
        overflow="hidden"
        h="$13"
        f={1}
        flexDirection="row"
        backgroundColor="$backgroundTransparent"
        br="$full"
      >
        <Input
          f={1}
          p="$6"
          onChangeText={(text) => {setPostName(text)}}
          pv="$0"
          fz="$2"
          lh="$2"
          maxLength={24}
          color="$color"
          fw="$2"
          placeholderTextColor="$secondaryText"
          unstyled
          placeholder="Название поста"
        />
        <View p="$6" pv="$0" flexDirection="row" alignItems="center">
          {String(postName.length)
            .split("")
            .map((char, i) => (
              <AnimatedText
                key={`${char}-${i}`}
                fz="$2"
                lh="$2"
                fw="$2"
                color="$secondaryText"
                entering={getCharEnter(i)}
                exiting={getCharExit(i)}
              >
                {char}
              </AnimatedText>
            ))}
          <Text fz="$2" lh="$2" fw="$2" color="$secondaryText">
            /24
          </Text>
        </View>
      </View>
  );
};

export default CaptureFooterPublishInput;
