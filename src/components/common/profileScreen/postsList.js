import { FlashList } from "@shopify/flash-list";
import useFetchProfilePosts from "@hooks/useFetchProfilePosts";
import PublishButton from "@components/common/profileScreen/publishButton";
import Post from "@components/ui/post";
import { useCallback } from "react";
import ProfileInfoBlock from "@components/common/profileScreen/infoBlock";
import { Dimensions } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const ProfilePostsList = ({ scrollY, actionsHeight, viewHeight, user }) => {
  const { posts, setPage } = useFetchProfilePosts(user?.id, true);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = ({item}) => {
    if (item?.type === "publish") {
      return <PublishButton />;
    }
    return <Post post={item} />;
  };

  const handleEndReached = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const keyExtractor = useCallback((item) => {
    return item?.id?.toString(); 
  }, []);

  return (
    <AnimatedFlashList
      keyExtractor={keyExtractor}
      contentContainerStyle={{
        paddingTop: width + actionsHeight,
        paddingHorizontal: 8,
      }}
      ListHeaderComponent={<ProfileInfoBlock user={user} />}
      data={posts}
      scrollEventThrottle={16}
      numColumns={2}
      initialNumToRender={4}
      maxToRenderPerBatch={12}
      estimatedListSize={{ width: width, height: width - viewHeight }}
      onEndReached={handleEndReached}
      overScrollMode="never"
      onScroll={onScroll}
      renderItem={renderItem}
      estimatedItemSize={250}
    />
  );
};

export default ProfilePostsList;
