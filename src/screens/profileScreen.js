import { View } from "tamagui";
import useFetchUser from "../hooks/useFetchUser";
import UserBlock from "@components/common/profileScreen/userBlock";
import ProfileInfoBlock from "@components/common/profileScreen/infoBlock";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import { Dimensions } from "react-native";
import { useState, memo } from "react";
import ProfileAvatar from "@components/common/profileScreen/userBlock/avatar";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
	const { user, isLoading, error } = useFetchUser();
	const [viewHeight, setViewHeight] = useState(0);
	const scrollY = useSharedValue(0);

	const onScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	return (
		<View flex={1} backgroundColor='$bg'>
			<ProfileAvatar scrollY={scrollY} viewHeight={viewHeight} user={user} />
			<Animated.ScrollView contentContainerStyle={{ paddingTop: width - viewHeight }} stickyHeaderIndices={[0]} scrollEventThrottle={16} overScrollMode='never' onScroll={onScroll}>
				<UserBlock viewHeight={viewHeight} setViewHeight={setViewHeight} scrollY={scrollY} user={user} />
				<View p='$6' gap="$6" backgroundColor='black'>
					<ProfileInfoBlock user={user} />
					{Array.from({ length: 4 }, (_, index) => (
						<View key={index} w='$full' h='$25' backgroundColor='$innerBlock' br='$7' />
					))}
				</View>
			</Animated.ScrollView>
		</View>
	);
};

export default memo(ProfileScreen);
