import { View } from "tamagui";
import useFetchUser from "../hooks/useFetchUser";
import UserBlock from "@components/common/profileScreen/userBlock";
import ProfileInfoBlock from "@components/common/profileScreen/infoBlock";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { Dimensions } from "react-native";
import { useState, memo } from "react";
import ProfileAvatar from "@components/common/profileScreen/userBlock/avatar";
import { FlashList } from "@shopify/flash-list";

const { width } = Dimensions.get("window");
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const ProfileScreen = () => {
  const { user, isLoading, error } = useFetchUser();
  const [actionsHeight, setActionsHeight] = useState(0);
  const scrollY = useSharedValue(0);
  const [viewHeight, setViewHeight] = useState(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = ({ item }) => {
    return <View m="$3" w="$full" h="$25" backgroundColor="$innerBlock" br="$7" />;
  };

  return (
    <View flex={1} backgroundColor="$bg">
      <ProfileAvatar viewHeight={viewHeight} actionsHeight={actionsHeight} scrollY={scrollY} user={user} />
      <UserBlock
        actionsHeight={actionsHeight}
        setViewHeight={setViewHeight}
        viewHeight={viewHeight}
        setActionsHeight={setActionsHeight}
        scrollY={scrollY}
        user={user}
      />
      <AnimatedFlashList
        contentContainerStyle={{ paddingTop: width + actionsHeight, paddingHorizontal: 8 }}
        ListHeaderComponent={<ProfileInfoBlock user={user} />}
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        scrollEventThrottle={16}
        masonry
        numColumns={2}
        overScrollMode="never"
        onScroll={onScroll}
        renderItem={renderItem}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default memo(ProfileScreen);
