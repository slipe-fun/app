import { View } from "tamagui";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { useState, useEffect } from "react";
import FastImage from "react-native-fast-image";
import addView from "@lib/addView";
import useBlurhashColor from "@hooks/ui/useBlurhashColor";
import MediaPreview from "@components/ui/mediaPreview";

const UserCard = ({ user, posts, active }) => {
  const [idx, setIdx] = useState(0);
  const [duration, setDuration] = useState(5.5);
  const [currentPost, setCurrentPost] = useState(posts[idx]);
  const [blurhash, setBlurhash] = useState("");

  const averageColor = useBlurhashColor(blurhash);

  const handeSlideClick = (direction) => {
    if (direction === "left" && idx > 0) {
      setIdx((prev) => prev - 1);
    } else if (direction === "right" && idx < posts.length - 1) {
      setIdx((prev) => prev + 1);
    }
  }

  const handleLoadVideo = (meta) => {
    const duration = meta.duration || 5.5;
    setDuration(duration > 0 ? duration : 5.5);
  };

  useEffect(() => {
    const post = posts[idx];
    setCurrentPost(post);
    setBlurhash(post?.blurhash || "");
    if (active && !post?.viewed) addView(post?.id);
  }, [idx, active, posts]);

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
      <MediaPreview
        media={currentPost?.image}
        blurhash={blurhash}
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
