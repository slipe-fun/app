import { YStack, View } from "tamagui";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { SearchHeader } from "../components/common/searchScreen/header/default";
import { SearchAnimatedHeader } from "../components/common/searchScreen/header/animated";
import CategoryGrid from "../components/common/searchScreen/categories/categoryGrid";
import { Results } from "../components/common/searchScreen/searchContent/results";
import { useState, useEffect } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const springConfig = {
  mass: 0.4,
  damping: 16,
  stiffness: 120,
};

export function SearchScreen() {
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);

  const [type, setType] = useState("post");
  const [query, setQuery] = useState("");

  const categoryOpacity = useSharedValue(1);
  const resultsOpacity = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  useEffect(() => {
    categoryOpacity.value = withSpring(isFocused ? 0 : 1, springConfig);
    resultsOpacity.value = withSpring(isFocused ? 1 : 0, springConfig);
  }, [isFocused]);

  const categoryStyle = useAnimatedStyle(() => ({
    opacity: categoryOpacity.value,
    display: categoryOpacity.value === 0 ? "none" : "flex",
    pointerEvents: categoryOpacity.value === 0 ? "none" : "auto",
  }));

  const resultsStyle = useAnimatedStyle(() => ({
    opacity: resultsOpacity.value,
    position: "absolute",
    zIndex: 100,
    top: 58 + (Platform.OS === "ios" ? insets.top : insets.top + 10),
    left: 0,
    right: 0,
    pointerEvents: resultsOpacity.value === 0 ? "none" : "auto",
  }));

  return (
    <YStack f={1} backgroundColor="$black">
      <SearchAnimatedHeader
        scrollY={scrollY}
        setIsFocused={setIsFocused}setQuery
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
          setQuery={setQuery}
        />
        <Animated.View style={categoryStyle}>
          <CategoryGrid/>
        </Animated.View>
      </Animated.ScrollView>
      <Animated.View style={resultsStyle}>
        <Results query={query} type={type} />
      </Animated.View>
    </YStack>
  );
}

export default SearchScreen;
