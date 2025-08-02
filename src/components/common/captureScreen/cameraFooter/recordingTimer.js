import { View, Text } from "tamagui";
import { useState, useEffect, memo, useMemo } from "react";
import useCaptureStore from "@stores/captureScreen";
import Animated from "react-native-reanimated";
import { getFadeIn, getFadeOut, getCharEnter, getCharExit } from "@constants/fadeAnimations";

const MAX_DURATION = 60;

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
    2,
    "0"
  )}`;

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

const CaptureRecordingTimer = ({ viewHeight }) => {
  const [time, setTime] = useState(0);
  const recording = useCaptureStore((s) => s.recording);
  const setRecording = useCaptureStore((s) => s.setRecording);

  useEffect(() => {
    if (!recording) return setTime(0);

    const id = setInterval(() => {
      setTime((prev) => {
        const next = prev + 1;
        if (next >= MAX_DURATION) {
          setRecording(false);
          clearInterval(id);
          return MAX_DURATION;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [recording]);

  const timeStr = useMemo(() => formatTime(time), [time]);

  if (!recording) return null;

  return (
    <AnimatedView
      position="absolute"
      bottom={viewHeight}
      overflow="hidden"
      backgroundColor="$contrastRed"
      flexDirection="row"
      pv="$3"
      ph="$6"
      br="$full"
      entering={getFadeIn()}
      exiting={getFadeOut()}
    >
      {timeStr.split("").map((char, i) => (
        <AnimatedText
          key={`${char}-${i}`}
          fz="$2"
          lh="$2"
          fw="$3"
          color="white"
          entering={getCharEnter(i)}
          exiting={getCharExit(i)}
        >
          {char}
        </AnimatedText>
      ))}
    </AnimatedView>
  );
};

export default memo(CaptureRecordingTimer);
