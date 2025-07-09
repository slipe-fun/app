import { Button, getVariableValue, View } from "tamagui";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useState } from "react";
import useCaptureStore from "@stores/captureScreen";
import { normalSpring } from "@constants/easings";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  interpolate,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

const COLOR_WHITE = getVariableValue("$white", "color");
const COLOR_RED = getVariableValue("$red", "color");

const CaptureButton = ({ cameraRef }) => {
  const formatIdx = useCaptureStore((s) => s.format);
  const recording = useCaptureStore((s) => s.recording);
  const setRecording = useCaptureStore((s) => s.setRecording);
  const setContent = useCaptureStore((s) => s.setContent);

  const format = useSharedValue(1);
  const recordingValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(recordingValue.value, [0, 1], [1, 0.6]) }],
    backgroundColor: interpolateColor(
      format.value,
      [0, 1],
      [COLOR_RED, COLOR_WHITE]
    ),
    borderRadius: interpolate(recordingValue.value, [0, 1], [40, 16]),
  }));

  const handlePress = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    if (formatIdx === 0) {
      if (recording) {
        setRecording(false);
        await cameraRef?.current?.stopRecording();
      } else {
        setRecording(true);
        await cameraRef?.current?.startRecording({
          onRecordingFinished: (video) => setContent(`file://${video?.path}`),
          onRecordingError: (error) => console.log(error),
        });
      }
    } else {
      const photo = await cameraRef?.current?.takePhoto({
        enableShutterSound: true,
      });
      setContent(`file://${photo?.path}`);
    }
  }, [cameraRef, recording, formatIdx]);

  useEffect(() => {
    recordingValue.value = withSpring(0, normalSpring);
    format.value = withSpring(formatIdx, normalSpring);
  }, [formatIdx]);

  useEffect(() => {
    recordingValue.value = withSpring(recording ? 1 : 0, normalSpring);
  }, [recording]);

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Button
        onPress={handlePress}
        pressStyle={{ scale: 0.95, opacity: 0.5 }}
        animation="fast"
        w="$18"
        h="$18"
        br="$full"
        backgroundColor="$transparent"
        borderWidth={3}
        p="$1"
        borderColor="$white"
        unstyled
      >
        <AnimatedView flex={1} style={animatedStyle} />
      </Button>
    </View>
  );
};

export default CaptureButton;
