import { View, YStack } from "tamagui";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import Indicators from "./indicators";
import { useState, useEffect, memo, useRef } from "react";
import FastImage from "react-native-fast-image";
import { useSharedValue } from "react-native-reanimated";
import addView from "@lib/addView";
import MediaPreview from "@components/ui/mediaPreview";
import useBlogsGestures from "@hooks/ui/useBlogsGestures";
import { GestureDetector } from "react-native-gesture-handler";

const UserCard = ({ user, posts, active, setPosts = null }) => {
	const [duration, setDuration] = useState(8);
	const progress = useSharedValue(0);
	const videoRef = useRef(null);

	const { gesture, activeIndex, isSeeking, seekTimeSec } = useBlogsGestures(active, posts?.length, progress, duration * 1000);

	const handleLoadVideo = meta => {
		const duration = meta?.duration;
		setDuration(duration);
	};

	useEffect(() => {
 if (videoRef.current && seekTimeSec > 0) {
    videoRef.current.seek(seekTimeSec);
  }
}, [seekTimeSec]);

	useEffect(() => {
		const isVideoFile =  /\.(mp4|mov|webm|mkv|avi)$/i.test(posts[activeIndex]?.image || "");
        if (!isVideoFile) setDuration(8);
		const post = posts[activeIndex];
		if (active && !post?.viewed) addView(post?.id);
	}, [activeIndex]);

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
					progress={progress}
					postsLength={posts?.length}
					currentIndex={activeIndex}
					paused={isSeeking}
					userId={user?.id}
					duration={duration}
				/>
				<UserCardHeader paused={isSeeking} post={posts[activeIndex]} user={user} />
			</YStack>
			<MediaPreview
				media={posts[activeIndex]?.image}
				blurhash={posts[activeIndex]?.blurhash}
				priority={FastImage.priority.high}
				isVideoEnable
				videoRef={videoRef}
				paused={!active || isSeeking}
				muted
				videoOnLoad={handleLoadVideo}
			/>
			<GestureDetector gesture={gesture}>
				<View zIndex='$3' flex={1} />
			</GestureDetector>
			<UserCardActions setPosts={setPosts} paused={isSeeking} post={posts[activeIndex]} />
		</View>
	);
};

export default memo(UserCard);
 