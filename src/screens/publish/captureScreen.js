import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../constants/theme";
import { View } from "tamagui";
import useInsets from "@hooks/useInsets";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import Animated from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

const CaptureScreen = () => {
  const insets = useInsets();
  const device = useCameraDevice("front");

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AnimatedView
        sharedTransitionTag="profile_camera"
        br="$7"
        m="$3"
        w="$full"
        h="$full"
        overflow="hidden"
      >
        <Camera isActive photo device={device} style={{ flex: 1 }} />
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACING.large,
    backgroundColor: COLORS.black,
  },
});

export default CaptureScreen;
