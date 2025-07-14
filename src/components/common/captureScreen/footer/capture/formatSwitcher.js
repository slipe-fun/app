import { normalSpring } from "@constants/easings";
import { useRef, memo, useCallback, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withSpring,
} from "react-native-reanimated";
import { XStack, Text, Button, View, useTheme } from "tamagui";
import useCaptureStore from "@stores/captureScreen";

const formats = ["ВИДЕО", "ФОТО"];

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

const FormatButton = memo(
  ({ format, index, selectedFormat, onSelect, onLayout }) => {
    const theme = useTheme();
    const inactiveColor = theme.secondaryText.get();
    const isActive = useSharedValue(index === selectedFormat ? 1 : 0);

    const animatedTextStyle = useAnimatedStyle(() => ({
      color: interpolateColor(isActive.value, [0, 1], [inactiveColor, "white"]),
    }));

    useEffect(() => {
      isActive.value = withSpring(
        index === selectedFormat ? 1 : 0,
        normalSpring
      );
    }, [selectedFormat]);

    return (
      <Button
        onPress={() => onSelect(index)}
        pressStyle={{
          scale: 0.95,
          opacity: 0.9,
        }}
        unstyled
        alignItems="center"
        justifyContent="center"
        backgroundColor="$transparent"
        ph="$7.5"
        h="$13"
        onLayout={onLayout}
      >
        <AnimatedText fz="$2" lh="$2" fw={500} style={animatedTextStyle}>
          {format}
        </AnimatedText>
      </Button>
    );
  }
);

const CaptureFormatSwitcher = () => {
  const format = useCaptureStore((state) => state.format);
  const setFormat = useCaptureStore((state) => state.setFormat);

  const indicatorX = useSharedValue(0);
  const indicatorW = useSharedValue(0);

  const layouts = useRef([]);

  const onSelect = useCallback(
    (index) => {
      setFormat(index);
      const layout = layouts.current[index];
      if (layout) {
        indicatorX.value = withSpring(layout.x, normalSpring);
        indicatorW.value = withSpring(layout.width, normalSpring);
      }
    },
    [setFormat]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorW.value,
  }));

  const handleLayout = useCallback(
    (index, e) => {
      const { x, width } = e.nativeEvent.layout;
      layouts.current[index] = { x, width };
      if (indicatorW.value === 0 && index === format) {
        indicatorX.value = x;
        indicatorW.value = width;
      }
    },
    [format]
  );

  return (
    <XStack
      h="$13"
      br="$full"
      backgroundColor="$backgroundTransparent"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <AnimatedView
        position="absolute"
        left={0}
        right={0}
        height="$13"
        br="$full"
        backgroundColor="$innerBlock"
        style={animatedStyle}
      />
      {formats.map((f, index) => (
        <FormatButton
          key={f}
          format={f}
          index={index}
          selectedFormat={format}
          onSelect={onSelect}
          onLayout={(e) => handleLayout(index, e)}
        />
      ))}
    </XStack>
  );
};

export default CaptureFormatSwitcher;
