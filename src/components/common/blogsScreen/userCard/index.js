import { View, YStack } from "tamagui";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import Indicators from "./indicators";
import { useState, useEffect } from "react";
import FastImage from "react-native-fast-image";
import addView from "@lib/addView";
import MediaPreview from "@components/ui/mediaPreview";
import useBlogsGestures from "@hooks/ui/useBlogsGestures";
import { GestureDetector } from "react-native-gesture-handler";

const UserCard = ({ user, posts, active }) => {
	const [duration, setDuration] = useState(5);

	const { gesture, activeIndex, updateIndex, isSeeking } = useBlogsGestures(active, posts?.length);

	const handleLoadVideo = meta => {
		const duration = meta.duration || 5;
		setDuration(duration > 0 ? duration : 5);
	};

	useEffect(() => {
		const post = posts[activeIndex];
		if (active && !post?.viewed) addView(post?.id);
	}, [activeIndex, active]);

	useEffect(() => {
		console.log("isSeeking changed:", isSeeking);
	}, [isSeeking])

	return (
		<View flex={1} justifyContent='space-between' overflow='hidden' br='$11'>
			<YStack zIndex='$1' w='$full' position='relative' p='$6' pt='$8' gap='$6'>
				<LinearGradient
					style={StyleSheet.absoluteFill}
					colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0)"]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
				/>
				<Indicators
					postsLength={posts?.length}
					paused={isSeeking}
					active={active}
					onFinish={() => updateIndex(1)}
					currentIndex={activeIndex}
					userId={user?.id}
					duration={duration}
				/>
				<UserCardHeader post={posts[activeIndex]} user={user} />
			</YStack>
			<MediaPreview
				media={posts[activeIndex]?.image}
				blurhash={posts[activeIndex]?.blurhash}
				priority={FastImage.priority.high}
				isVideoEnable
				paused={!active || isSeeking}
				muted
				videoOnLoad={handleLoadVideo}
			/>
			<GestureDetector gesture={gesture}>
				<View zIndex='$3' flex={1} />
			</GestureDetector>
			<UserCardActions post={posts[activeIndex]} />
		</View>
	);
};

export default React.memo(UserCard);
