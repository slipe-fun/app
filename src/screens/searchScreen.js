import { YStack, View } from "tamagui";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { SearchHeader } from "../components/common/searchScreen/header/default";
import { SearchAnimatedHeader } from "../components/common/searchScreen/header/animated";
import { Results } from "../components/common/searchScreen/searchContent/results";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { categories } from "@constants/categories";
import Category from "../components/common/searchScreen/category";
import { normalSpring } from "@constants/easings";
import useSearchStore from "@stores/searchScreen";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export function SearchScreen() {
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const resultsOpacity = useSharedValue(0);

  const isFocused = useSearchStore((state) => state.isFocused);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const resultsStyle = useAnimatedStyle(() => ({
    opacity: resultsOpacity.value,
    position: "absolute",
    zIndex: 100,
    top: 58 + (Platform.OS === "ios" ? insets.top : insets.top + 10),
    left: 0,
    height: "100%",
    right: 0,
    backgroundColor: "#000",
    pointerEvents: resultsOpacity.value === 0 ? "none" : "auto",
  }));

  const renderItem = ({ item, index }) => (
    <View style={{ flex: 1, margin: 8 }}>
      <Category category={item} colIndex={index % 2} />
    </View>
  );

  useEffect(() => {
    resultsOpacity.value = withSpring(isFocused ? 1 : 0, normalSpring);
  }, [isFocused]);

  return (
    <YStack f={1} backgroundColor="$black">
      <SearchAnimatedHeader
        scrollY={scrollY}
      />

      <AnimatedFlashList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        initialNumToRender={10}
        maxToRenderPerBatch={6}
        ListHeaderComponent={
          <SearchHeader
            scrollY={scrollY}
          />
        }
        estimatedItemSize={131}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        columnWrapperStyle={{
          marginBottom: 24,
        }}
        scrollEventThrottle={16}
        onScroll={onScroll}
      />
      <Animated.View style={resultsStyle}>
        <Results />
      </Animated.View>
    </YStack>
  );
}

export default SearchScreen;
