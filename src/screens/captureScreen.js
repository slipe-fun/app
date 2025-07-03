import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../constants/theme";
import { View } from "tamagui";
import useInsets from "@hooks/useInsets";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import Animated from "react-native-reanimated";
import CaptureCamera from "@components/common/captureScreen/camera";

const AnimatedView = Animated.createAnimatedComponent(View);

const CaptureScreen = () => {
  const insets = useInsets();
  const device = useCameraDevice("front");

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <CaptureCamera/>
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
