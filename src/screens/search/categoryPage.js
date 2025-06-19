import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import CategoryPageHeader from "@components/common/searchScreen/categoryPage/header/header";
import { View } from "tamagui";

export function CategoryPage({ route }) {
  const { category } = route.params;
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View f={1} backgroundColor="$black">
      <Animated.ScrollView
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
        onScroll={onScroll}
        style={{ flex: 1 }}
      >
        <CategoryPageHeader category={category} scrollY={scrollY} />
      </Animated.ScrollView>
    </View>
  );
}

export default CategoryPage;
