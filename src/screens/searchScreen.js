import { YStack } from "tamagui";
import Animated, { Easing, FadeInDown, FadeOutUp } from "react-native-reanimated";
import { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import { SearchHeader } from "../components/common/searchScreen/header/default";
import { SearchAnimatedHeader } from "../components/common/searchScreen/header/animated";
import CategoryGrid from "../components/common/searchScreen/categories/categoryGrid";
import { Results } from "../components/common/searchScreen/searchContent/results";
import { useState } from "react";

export function SearchScreen() {
  const scrollY = useSharedValue(0);
  const [isFocused, setIsFocused] = useState(false);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <YStack f={1} backgroundColor="$black">
      <SearchAnimatedHeader
        scrollY={scrollY}
        setIsFocused={setIsFocused}
        isFocused={isFocused}
      />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={{ gap: 16 }}
      >
        <SearchHeader
          scrollY={scrollY}
          setIsFocused={setIsFocused}
          isFocused={isFocused}
        />

        <Animated.View
          key={isFocused ? 'results' : 'grid'}
          entering={FadeInDown.duration(200).easing(Easing.inOut(Easing.ease))}
          exiting={FadeOutUp.duration(200).easing(Easing.inOut(Easing.ease))}
        >
          {isFocused ? <Results /> : <CategoryGrid />}
        </Animated.View>
      </Animated.ScrollView>
    </YStack>
  );
}

export default SearchScreen;
