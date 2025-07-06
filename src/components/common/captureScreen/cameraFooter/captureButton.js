import { Button, getVariableName, getVariableValue, View } from "tamagui";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect } from "react";
import useCaptureStore from "@stores/captureScreen";
import { normalSpring } from "@constants/easings";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);
const whiteVar = getVariableValue("$white", "color");
const redVar = getVariableValue("$red", "color");

const CaptureButton = ({ cameraRef }) => {
  const formatIdx = useCaptureStore((s) => s.format);
  const format = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(format.value, [0, 1], [redVar, whiteVar]),
  }));

  const handlePress = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    const photo = await cameraRef?.current?.takePhoto({
      enableShutterSound: true,
    });
    console.log(photo);
  }, [cameraRef]);

  useEffect(() => {
    format.value = withSpring(formatIdx, normalSpring);
  }, [formatIdx]);

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Button
        onPress={handlePress}
        pressStyle={{
          scale: 0.95,
          opacity: 0.5,
        }}
        animation="fast"
        w="$18"
        br="$full"
        h="$18"
        backgroundColor="$transparent"
        unstyled
        borderWidth={3}
        p="$1"
        borderColor="$white"
      >
        <AnimatedView f={1} br="$full" style={animatedStyle} />
      </Button>
    </View>
  );
};

export default CaptureButton;
