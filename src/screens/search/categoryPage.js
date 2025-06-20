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
      <View position="absolute" top={0} left={0} right={0} zIndex={1}>
        <CategoryPageHeader category={category} scrollY={scrollY} />
      </View>
      <AnimatedFlashList
        contentContainerStyle={{ paddingTop: width + 16, paddingHorizontal: 8, }} // отступ под хедер
        data={posts}
        masonry
        overrideItemLayout={(layout, item) => {
          layout.size = item.height;
        }}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={300}
        numColumns={2}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Post key={item.id} post={item} width={(width - 48) / 2} />
        )}
        onEndReached={() => setPage((prev) => prev + 1)}
        onEndReachedThreshold={0.5}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      />
    </View>
  );
}

export default CategoryPage;

