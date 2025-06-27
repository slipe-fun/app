import { memo, useMemo, useCallback, useState } from "react";
import { Button } from "tamagui";
import { URLS } from "@constants/urls";
import * as Haptics from "expo-haptics";
import FastImage from "react-native-fast-image";
import { StyleSheet } from "react-native";
import { Blurhash } from "react-native-blurhash";

const Post = ({ post, width }) => {
	const readyImage = `${URLS.CDN_POSTS_URL}${post.image}`;
	const [loaded, setLoaded] = useState(false);

	const imageHeight = useMemo(() => {
		return (width * post?.size.height) / post?.size.width;
	}, [post?.size]);

	const handleLoad = useCallback(() => {
		setLoaded(true);
	}, []);

	const handlePress = useCallback(() => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
	}, []);

	return (
		<Button
			unstyled
			m='$3'
			p='$0'
			overflow='hidden'
			br='$7'
			style={{
				height: imageHeight || 220,
			}}
			position='relative'
			animation='fast'
			backgroundColor='$transparent'
			pressStyle={{
				scale: 0.98,
				opacity: 0.9,
			}}
			onPress={handlePress}
		>
			<FastImage
        resizeMode={FastImage.resizeMode.cover}
        onLoad={handleLoad}
				source={{ uri: readyImage, priority: FastImage.priority.high }}
        style={[StyleSheet.absoluteFill, {backgroundPosition: "center"}]}
			/>
			{!loaded && <Blurhash style={StyleSheet.absoluteFill} decodeAsync blurhash={post?.blurhash} />}
		</Button>
	);
};

export default memo(Post);
