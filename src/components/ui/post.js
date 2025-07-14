import { memo, useCallback, useState } from "react";
import { View } from "tamagui";
import { URLS } from "@constants/urls";
import * as Haptics from "expo-haptics";
import FastImage from "react-native-fast-image";
import { StyleSheet } from "react-native";
import { Blurhash } from "react-native-blurhash";
import { Pressable } from "react-native-gesture-handler";

const Post = ({ post }) => {
	const [loaded, setLoaded] = useState(false);

	const handleLoad = useCallback(() => {
		setLoaded(true);
	}, []);

	const handlePress = useCallback(() => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
	}, []);

	return (
			<View
				p='$0'
				m='$3'
				overflow='hidden'
				br='$7'
				w='$full'
				position='relative'
				onPress={handlePress}
				backgroundColor='$transparent'
				pressStyle={{
					scale: 0.98,
					opacity: 0.9,
				}}
			>
				<View position="absolute" top={0} left={0} right={0} bottom={0} aspectRatio="6/9" br="$7" zIndex="$2" borderWidth={1} borderColor="rgba(255, 255, 255, 0.2)"  />
				<FastImage
					resizeMode='cover'
					onLoad={handleLoad}	
					source={{ uri: `${URLS.CDN_POSTS_URL}${post.image}`, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable }}
					style={[{ aspectRatio: '6/9', width: '100%'}]}
				/>
				{!loaded && <Blurhash style={StyleSheet.absoluteFill} decodeAsync blurhash={post?.blurhash} />}
			</View>
	);
};

export default memo(Post);
