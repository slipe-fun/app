import { memo, useCallback } from "react";
import { View, Text, XStack, YStack } from "tamagui";
import * as Haptics from "expo-haptics";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "./icon";
import MediaPreview from "./mediaPreview";

const Post = ({ post }) => {
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
			<View aspectRatio='6/9' />
			<MediaPreview blurhash={post?.blurhash} media={post?.image} />
			<YStack position='absolute' p='$6.5' pr='$4' left={0} right={0} bottom={0} gap='$2'>
				<Text
					zIndex='$1'
					whiteSpace='nowrap'
					numberOfLines={1}
					textOverflow='ellipsis'
					w='$full'
					overflow='hidden'
					fz='$4'
					lh='$4'
					fw='$3'
					color='$white'
				>
					{post?.in_search}
				</Text>
				<XStack zIndex='$1' opacity={0.7} alignItems='center' gap='$2'>
					<Icon size={16} icon='eye' />
					<Text fz='$1' lh='$1' fw='$2' color='$white'>
						{post?.views}
					</Text>
				</XStack>
				<LinearGradient
					colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					style={StyleSheet.absoluteFill}
				/>
			</YStack>
		</View>
	);
};

export default memo(Post);
