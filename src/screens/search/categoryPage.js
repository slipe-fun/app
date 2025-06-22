import { View } from "tamagui";
import { Dimensions } from "react-native";
import CategoryPageHeader from "@components/common/searchScreen/categoryPage/header";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import Post from "@components/ui/post";
import useFetchCategoryPosts from "@hooks/useFetchCategoryPosts";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler, 
} from "react-native-reanimated";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const SCREEN_WIDTH = Dimensions.get("window").width;

const CategoryPage = ({ route }) => {
  const { category } = route.params;
  const scrollY = useSharedValue(0);
  const [width, setWidth] = useState(SCREEN_WIDTH);

  const { posts, setPage } = useFetchCategoryPosts(category?.name?.toLowerCase());

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View f={1} backgroundColor="$black">
      {/* <View position="absolute" top={0} left={0} right={0} zIndex={1}>
        <CategoryPageHeader category={category} scrollY={scrollY} />
      </View> */}
      <AnimatedFlashList
        contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 8, }}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        masonry
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Post key={item.id} post={item} width={(width - 48) / 2} />
        )}
        onEndReached={() => setPage((prev) => prev + 1)}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      />
    </View>
  );
}

export default CategoryPage;

