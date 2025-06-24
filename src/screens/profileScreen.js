import { View } from "tamagui";
import useFetchUser from "../hooks/useFetchUser";
import UserBlock from "@components/common/profileScreen/userBlock";
import ProfileInfoBlock from "@components/common/profileScreen/infoBlock";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";

const ProfileScreen = () => {
	const { user, isLoading, error } = useFetchUser();
	const scrollY = useSharedValue(0)

	const onScroll = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	  });

	return (
		<View flex={1} backgroundColor='$bg'>
			<Animated.ScrollView  scrollEventThrottle={16} overScrollMode='never' onScroll={onScroll}>
				<UserBlock scrollY={scrollY} user={user} />
				<View p='$6' gap="$6">
					<ProfileInfoBlock user={user} />
					{Array.from({ length: 4 }, (_, index) => (
						<View key={index} w='$full' h='$20' backgroundColor='$innerBlock' br='$7' />
					))}
				</View>
			</Animated.ScrollView>
		</View>
	);
};

export default ProfileScreen;
