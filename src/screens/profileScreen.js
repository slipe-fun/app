import { View, Text, getVariableValue } from "tamagui";
import useFetchUser from "../hooks/useFetchUser";
import UserBlock from "@components/common/profileScreen/userBlock";
import ProfileInfoBlock from "@components/common/profileScreen/infoBlock";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import { Dimensions } from "react-native";
import { useState, memo, useCallback } from "react";
import ProfileAvatar from "@components/common/profileScreen/userBlock/avatar";
import { FlashList } from "@shopify/flash-list";
import useFetchProfilePosts from "@hooks/useFetchProfilePosts";
import PublishButton from "@components/common/profileScreen/publishButton";
import Post from "@components/ui/post";

const { width } = Dimensions.get("window");
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);
const postHeightVar = getVariableValue("$27", "size");

const ProfileScreen = () => {
	const { user, isLoading, error } = useFetchUser();
	const [actionsHeight, setActionsHeight] = useState(0);
	const scrollY = useSharedValue(0);
	const { posts, setPage } = useFetchProfilePosts(user?.id, true);
	const [viewHeight, setViewHeight] = useState(0);

	const onScroll = useAnimatedScrollHandler({
		onScroll: event => {
			scrollY.value = event.contentOffset.y;
		},
	});

	const renderItem = useCallback(({ item }) => {
		switch (item?.type) {
			case "publish":
				return <PublishButton key={item?.id} />;
			default:
				return <Post post={item} />;
		}
	}, []);

	const handleEndReached = useCallback(() => {
		setPage(prev => prev + 1);
	}, []);

	return (
		<View flex={1} backgroundColor='$bg'>
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
				keyExtractor={item => item?.id?.toString()}
				contentContainerStyle={{
					paddingTop: width + actionsHeight,
					paddingHorizontal: 8,
				}}
				ListHeaderComponent={<ProfileInfoBlock user={user} />}
				data={posts}
				scrollEventThrottle={16}
				optimizeItemArrangement={false}
				numColumns={2}
				initialNumToRender={4}
				maxToRenderPerBatch={12}
				estimatedListSize={{ width: width, height: width - viewHeight }}
				onEndReached={handleEndReached}
				overScrollMode='never'
				onScroll={onScroll}
				renderItem={renderItem}
				estimatedItemSize={postHeightVar}
			/>
		</View>
	);
};

export default memo(ProfileScreen);
