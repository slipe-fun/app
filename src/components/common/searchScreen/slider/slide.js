import { Button, Text, XStack, View } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";
import { Blurhash } from "react-native-blurhash";
import { URLS } from "@constants/urls";
import Animated, {
  useAnimatedStyle,
  withSpring,
  fastSpring,
} from "react-native-reanimated";
import { useState } from "react";

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const SearchSliderSlide = ({ post, title }) => {
  const [loaded, setLoaded] = useState(false);
  const isVideo = post?.image
    ? /\.(mp4|mov|webm|mkv|avi)$/i.test(post?.image)
    : false;

  const handleLoad = () => {
    setLoaded(true);
  };

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: withSpring(loaded ? 1 : 0, fastSpring),
    };
  }, [loaded]);

  return (
    <View justifyContent="flex-end" f={1}>
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        aspectRatio="6/9"
        br="$8"
        zIndex="$2"
        borderWidth={1}
        borderColor="rgba(255, 255, 255, 0.1)"
      />
      {isVideo ? (
        <Video
          source={{ uri: `${URLS.CDN_POSTS_URL}${post?.image}` }}
          repeat
          muted
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
          onLoad={handleLoad}
        />
      ) : (
        <>
          <AnimatedFastImage
            resizeMode="cover"
            onLoad={handleLoad}
            source={{
              uri: `${URLS.CDN_POSTS_URL}${post?.image}`,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={[StyleSheet.absoluteFill, animatedOpacity]}
          />
          {!loaded && post?.blurhash && (
            <Blurhash
              style={StyleSheet.absoluteFill}
              decodeAsync
              blurhash={post?.blurhash}
            />
          )}
        </>
      )}
      <XStack
        alignItems="center"
        w="$full"
        position="relative"
        p="$6.5"
        gap="$6"
      >
        <Text
          overflow="hidden"
          fw="$3"
          lh="$4"
          f={1}
          fz="$4"
          zIndex="$1"
          textOverflow="ellipsis"
          numberOfLines={2}
        >
          {title}
        </Text>
        <Button
          h="$12"
          unstyled
          br="$full"
          zIndex="$1"
          justifyContent="center"
          ph="$7"
          backgroundColor="$white"
        >
          <Text fz="$2" lh="$2" fw="$3" color="$black">
            Открыть
          </Text>
        </Button>
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </XStack>
    </View>
  );
};

export default SearchSliderSlide;
