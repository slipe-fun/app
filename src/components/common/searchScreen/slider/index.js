import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
} from "react-native-reanimated";
import { XStack, YStack, View } from "tamagui";
import { normalSpring } from "@constants/easings";
import SearchSliderSlide from "./slide";
import * as Haptics from "expo-haptics";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ITEM_SPACING = 16;
const ITEM_WIDTH = SCREEN_WIDTH - ITEM_SPACING * 2;
const ITEM_HEIGHT = 200;
const data = [0, 1, 2];

const AnimatedView = Animated.createAnimatedComponent(View);

const SearchSlider = () => {
  const progress = useSharedValue(0);
  const roundedProgress = useDerivedValue(() => Math.round(progress.value));

  const renderItem = ({ index }) => (
    <View
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)}
      pressStyle={{ opacity: 0.9 }}
      w={ITEM_WIDTH}
      mh="$6"
      h={ITEM_HEIGHT}
      br="$8"
      overflow="hidden"
    >
      <SearchSliderSlide />
    </View>
  );

  return (
    <YStack gap="$6">
      <Carousel
        width={SCREEN_WIDTH}
        height={ITEM_HEIGHT}
        autoPlay
        autoPlayInterval={4000}
        data={data}
        loop={false}
        mode="parallax"
        pagingEnabled
        style={{ justifyContent: "center", width: "100%" }}
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: ITEM_SPACING,
        }}
        onProgressChange={(_, absProgress) => {
          progress.value = absProgress;
        }}
        renderItem={renderItem}
      />

      <XStack justifyContent="center">
        {data.map((_, i) => {
          const animatedDotStyle = useAnimatedStyle(() => ({
            width: withSpring(
              roundedProgress.value === i ? 18 : 6,
              normalSpring
            ),
            opacity: withSpring(
              roundedProgress.value === i ? 1 : 0.35,
              normalSpring
            ),
          }));

          return ( 
            <AnimatedView
              key={i}
              backgroundColor="$color"
              height={6}
              borderRadius={3}
              marginHorizontal={4}
              style={animatedDotStyle}
            />
          );
        })}
      </XStack>
    </YStack>
  );
};

export default SearchSlider;
