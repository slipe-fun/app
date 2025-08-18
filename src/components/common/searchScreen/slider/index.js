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
import { useEffect, useState } from "react";
import useSearchStore from "@stores/searchScreen";
import useFetchPostsForSlider from "@hooks/useFetchPostsForSlider";
import { useTranslation } from "react-i18next";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ITEM_SPACING = 16;
const ITEM_WIDTH = SCREEN_WIDTH - ITEM_SPACING * 2;
const ITEM_HEIGHT = 200;

const AnimatedView = Animated.createAnimatedComponent(View);

const SearchSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const progress = useSharedValue(0);
  const roundedProgress = useDerivedValue(() => Math.round(progress.value));

  const setSlidePosts = useSearchStore((state) => state.setSlidePosts);
  const slidePosts = useSearchStore((state) => state.slidePosts);

  const { t } = useTranslation();

  const data = [
    { title: t("search.relevant"), type: "relevant" },
    { title: t("search.top10"), type: "popular" },
    { title: t("search.similar"), type: "similar" },
  ];

  const { data: relevant } = useFetchPostsForSlider("relevant");
  const { data: popular } = useFetchPostsForSlider("popular");
  const { data: similar } = useFetchPostsForSlider("similar");


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
      <SearchSliderSlide
        isActive={index === currentIndex}
        posts={slidePosts[data[index].type]}
        title={data[index].title}
      />
    </View>
  );

  useEffect(() => {
    setSlidePosts({
      relevant: relevant,
      popular: popular,
      similar: similar
    });
  }, [relevant, popular, similar]);

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
          parallaxScrollingOffset: 26,
        }}
        onProgressChange={(_, absProgress) => {
          progress.value = absProgress;
        }}
        renderItem={renderItem}
        onScrollEnd={(current) => {
          setCurrentIndex(current);
        }}
      />

      <XStack justifyContent="center">
        {data.map((_, i) => {
          const animatedDotStyle = useAnimatedStyle(() => ({
            width: withSpring(
              roundedProgress.value === i ? 18 : 6,
              normalSpring,
            ),
            opacity: withSpring(
              roundedProgress.value === i ? 1 : 0.35,
              normalSpring,
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
