import { memo, useCallback } from "react";
import { View, Text, XStack } from "tamagui";
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
      p="$0"
      m="$3"
      overflow="hidden"
      br="$7"
      w="$full"
      position="relative"
      onPress={handlePress}
      backgroundColor="$transparent"
      pressStyle={{
        scale: 0.98,
        opacity: 0.9,
      }}
    >
      <View
        br="$7"
        aspectRatio="6/9"
        zIndex="$2"
        borderWidth={1}
        borderColor="rgba(255, 255, 255, 0.1)"
      />
      <MediaPreview blurhash={post?.blurhash} media={post?.image}/>
      <View
        position="absolute"
        p="$6.5"
        pr="$3"
		pb="$6"
        left={0}
        right={0}
        bottom={0}
        gap="$3"
      >
        <Text
          zIndex="$1"
          whiteSpace="nowrap"
		  numberOfLines={1}
          textOverflow="ellipsis"
          w="$full"
          overflow="hidden"
          fz="$4"
          lh="$4"
          fw="$3"
          color="$white"
        >
          {post?.in_search}
        </Text>
        <XStack zIndex="$1" opacity={0.7} alignItems="center" gap="$2">
          <Icon size={18} icon="eye" />
          <Text fz="$1" lh="$1" fw="$2" color="$white">
            {post?.views}
          </Text>
        </XStack>
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
    </View>
  );
};

export default memo(Post);
