import { StyleSheet } from "react-native";
import { View } from "tamagui";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { useState, useCallback, useEffect } from "react";
import { URLS } from "@constants/urls";
import FastImage from "react-native-fast-image";
import { Blurhash } from "react-native-blurhash";
import { fastSpring } from "@constants/easings";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import Video from "react-native-video";
import addView from "@lib/addView";
import useBlurhashColor from "@hooks/ui/useBlurhashColor";

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const UserCard = ({ user, posts, active }) => {
  const [loaded, setLoaded] = useState(false);
  const [idx, setIdx] = useState(0);
  const [duration, setDuration] = useState(5.5);
  const [isVideo, setIsVideo] = useState(false);
  const [currentPost, setCurrentPost] = useState(posts[idx]);
  const [blurhash, setBlurhash] = useState("");

  const averageColor = useBlurhashColor(blurhash);

  const handleLoad = useCallback(() => {
      setLoaded(true);
  }, []);

  const handeSlideClick = (direction) => {
    if (direction === "left" && idx > 0) {
      setIdx((prev) => prev - 1);
    } else if (direction === "right" && idx < posts.length - 1) {
      setIdx((prev) => prev + 1);
    }
  }

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: withSpring(loaded ? 1 : 0, fastSpring),
    };
  }, [loaded]);

  const handleLoadVideo = (meta) => {
    const duration = meta.duration || 5.5;
    setDuration(duration > 0 ? duration : 5.5);
  };

  useEffect(() => {
    setCurrentPost(posts[idx]);
    setBlurhash(posts[idx]?.blurhash || "");
    if (active && !currentPost?.viewed) addView(currentPost?.id);
  }, [idx, active]);

  useEffect(() => {
    setIsVideo(currentPost?.image ? /\.(mp4|mov|webm|mkv|avi)$/i.test(currentPost?.image) : false);
  }, [currentPost]);

  useEffect(() => {
    setLoaded(false);
  }, [currentPost]); 

  return (
    <View flex={1} justifyContent="space-between" overflow="hidden" br="$7">
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        br="$7"
        borderWidth={1}
        borderColor="rgba(255,255,255,0.1)"
        zIndex="$2"
        pointerEvents="none"
      />
      {isVideo ? (
        <Video
          source={{ uri: `${URLS.CDN_POSTS_URL}${currentPost?.image}` }}
          repeat
          paused={!active}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
          onLoad={handleLoadVideo}
        />
      ) : (
        <>
          <AnimatedFastImage
            resizeMode="cover"
            onLoad={handleLoad}
            source={{
              uri: `${URLS.CDN_POSTS_URL}${currentPost?.image}`,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={[StyleSheet.absoluteFill, animatedOpacity]}
          />
          {!loaded && blurhash && (
            <Blurhash
              style={StyleSheet.absoluteFill}
              decodeAsync
              blurhash={blurhash}
            />
          )}
        </>
      )}

      <UserCardHeader
        postCount={posts?.length}
        pause={!active}
        activeIdx={idx}
        duration={duration}
        handeSlideClick={handeSlideClick}
        post={posts[idx]}
        user={user}
        averageColor={averageColor}
      />

      {posts?.length > 1 && (
        <View f={1} flexDirection="row" zIndex="$1">
          <View f={1} onPress={() => handeSlideClick("left")} />
          <View f={1} onPress={() => handeSlideClick("right")} />
        </View>
      )}

      <UserCardActions averageColor={averageColor} post={posts[idx]} />
    </View>
  );
};

function areEqual(prev, next) {
  return (
    prev.user.id === next.user.id &&
    prev.active === next.active &&
    prev.posts === next.posts
  );
}

export default React.memo(UserCard, areEqual);
