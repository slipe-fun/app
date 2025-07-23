import { FlashList } from "@shopify/flash-list";
import useFetchProfilePosts from "@hooks/useFetchProfilePosts";
import PublishButton from "@components/common/profileScreen/publishButton";
import Post from "@components/ui/post";
import { useCallback } from "react";
import ProfileInfoBlock from "@components/common/profileScreen/infoBlock";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import useInsets from "@hooks/ui/useInsets";
import { useProfileStore } from "@stores/profileScreen";
import { getVariableValue, YStack } from "tamagui";
import ProfileBlock from "./profileBlock";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const buttonSize = getVariableValue("$13", "size");

const ProfilePostsList = ({ scrollY }) => {
  const user = useProfileStore((state) => state.user);

  const { posts, setPage } = useFetchProfilePosts(user?.id, true);

  const insets = useInsets();

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = useCallback(({item}) => {
    if (item?.type === "publish") {
      return <PublishButton />;
    }
    return <Post post={item} />;
  }, []);

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
        paddingTop: insets.top + (buttonSize / 2),
        paddingHorizontal: 8,
      }}
      ListHeaderComponent={<YStack ph="$3" pb="$3" gap="$6"><ProfileBlock scrollY={scrollY}/><ProfileInfoBlock /></YStack>}
      data={posts}
      scrollEventThrottle={16} 
      numColumns={2}
      initialNumToRender={4}
      maxToRenderPerBatch={12}
      onEndReached={handleEndReached}
      onScroll={onScroll}
      renderItem={renderItem}
      estimatedItemSize={250}
    />
  );
};

export default ProfilePostsList;
