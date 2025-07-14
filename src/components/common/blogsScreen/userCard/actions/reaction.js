import { memo, useEffect } from "react";
import ColorfullyView from "@components/ui/colorfullyView";
import { fastSpring } from "@constants/easings";
import { Text, View, Image, getVariableValue } from "tamagui";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { getCharEnter, getCharExit } from "@constants/fadeAnimations";

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

const activeColorVar = getVariableValue("$black", "color");
const inActiveColorVar = getVariableValue("$white", "color");

const Reaction = memo(
  ({
    emojis,
    reaction,
    emojiImages,
    handleEmojiClick,
    isActive,
    averageColor,
  }) => {
    const colorValue = useSharedValue(0);

    const animatedTextStyles = useAnimatedStyle(() => ({
      color: interpolateColor(
        colorValue.value,
        [1, 0],
        [activeColorVar, inActiveColorVar]
      ),
    }));

    const animatedViewStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        colorValue.value,
        [1, 0],
        [inActiveColorVar, "#00000000"]
      ),
    }));

    useEffect(() => {
      colorValue.value = withSpring(isActive ? 1 : 0, fastSpring);
    }, [isActive]);

    return (
      <ColorfullyView
        isButton
        backgroundColor="$transparent"
        br="$full"
        overflow="hidden"
        color={`rgb(${averageColor})`}
        unstyled
        onPress={() => handleEmojiClick(reaction)}
      >
        <AnimatedView
          ph="$6"
          gap="$3"
          f={1}
          alignItems="center"
          flexDirection="row"
          style={animatedViewStyle}
        >
          <Image
            style={{ width: 20, height: 20 }}
            source={emojiImages[reaction]}
          />

          {String(emojis[reaction]?.count)
            .split("")
            .map((char, i) => (
              <AnimatedText
                key={`${char}-${i}`}
                fz="$2"
                lh="$2"
                style={animatedTextStyles}
                fw="$2"
                color="white"
                entering={getCharEnter(i)}
                exiting={getCharExit(i)}
              >
                {char}
              </AnimatedText>
            ))}
        </AnimatedView>
      </ColorfullyView>
    );
  }
);

export default Reaction;
