import { View } from "tamagui";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { useState, useEffect, memo } from "react";
import addView from "@lib/addView";
import CardSlider from "./slider";

const UserCard = ({ user, posts, active }) => {
  const [idx, setIdx] = useState(0);
  const [duration, setDuration] = useState(5.5);

  const handeSlideClick = (direction) => {
    if (direction === "left" && idx > 0) {
      setIdx((prev) => prev - 1);
    } else if (direction === "right" && idx < posts.length - 1) {
      setIdx((prev) => prev + 1);
    }
  }

  useEffect(() => {
    const post = posts[idx];
    if (active && !post?.viewed) addView(post?.id);
  }, [idx, active, posts]);

  useEffect(() => {
    setIdx(0); 
  }, [active]);

  return (
    <View flex={1} justifyContent="space-between" overflow="hidden" br="$12">
       <View
        br="$12"
        top={0}
        left={0}
        right={0}
        pointerEvents="none"
        bottom={0}
        zIndex="$2"
        borderWidth={1}
        position="absolute"
        borderColor="rgba(255, 255, 255, 0.1)"
      />
      <CardSlider posts={posts} setDuration={setDuration} setIdx={setIdx} idx={idx}/>
      <UserCardHeader
        postCount={posts?.length}
        pause={!active}
        activeIdx={idx} 
        duration={duration}
        handeSlideClick={handeSlideClick}
        post={posts[idx]}
        user={user}
      />

      {/* {posts?.length > 1 && (
        <View f={1} flexDirection="row" zIndex="$1">
          <View f={1} onPress={() => handeSlideClick("left")} />
          <View f={1} onPress={() => handeSlideClick("right")} />
        </View>
      )} */}

      <UserCardActions post={posts[idx]} />
    </View>
  );
};

export default memo(UserCard);
