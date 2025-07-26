import { View, XStack } from "tamagui";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { useState, useEffect } from "react";
import FastImage from "react-native-fast-image";
import addView from "@lib/addView";
import MediaPreview from "@components/ui/mediaPreview";
import { Pressable } from "react-native-gesture-handler";

const UserCard = ({ user, posts, active }) => {
  const [idx, setIdx] = useState(0);
  const [duration, setDuration] = useState(8);

  const handeSlideClick = (direction) => {
    if (direction === "left" && idx > 0) {
      setIdx((prev) => prev - 1);
    } else if (direction === "right" && idx < posts.length - 1) {
      setIdx((prev) => prev + 1);
    }
  }

  const handleLoadVideo = (meta) => {
    const duration = meta.duration || 8;
    setDuration(duration > 0 ? duration : 8);
  }; 

  useEffect(() => { 
    const post = posts[idx];
    if (active && !post?.viewed) addView(post?.id);
  }, [idx, active]);

  return (
    <View flex={1} justifyContent="space-between" overflow="hidden" br="$11">
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        br="$11"
        borderWidth={1}
        borderColor="rgba(255,255,255,0.1)"
        zIndex="$2"
        pointerEvents="none"
      />
      <MediaPreview
        media={posts[idx]?.image}
        blurhash={posts[idx]?.blurhash}
        priority={FastImage.priority.high}
        isVideoEnable
        active={active}
        muted
        videoOnLoad={handleLoadVideo}
      />
      <UserCardHeader
        postCount={posts?.length}
        pause={!active}
        activeIdx={idx}
        duration={duration}
        handeSlideClick={handeSlideClick}
        post={posts[idx]}
        user={user}
      />

      {posts?.length > 1 && (
        <XStack f={1} zIndex="$1">
          <Pressable style={{ flex: 1 }} onPress={() => handeSlideClick("left")} />
          <Pressable style={{ flex: 1 }} onPress={() => handeSlideClick("right")} />
        </XStack>
      )}

      <UserCardActions post={posts[idx]} />
    </View>
  );
};

export default React.memo(UserCard);
