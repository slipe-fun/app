import { StyleSheet } from "react-native";
import { View } from "tamagui";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { useState, useEffect, useCallback, useMemo } from "react";
import { URLS } from "@constants/urls";
import useFetchUserPosts from "@hooks/useFetchUserPosts";
import FastImage from "react-native-fast-image";
import { Blurhash } from "react-native-blurhash";

const UserCard = ({
  user,
  posts,
  active,
  usersNavigation,
  goToNext,
  goToPrevious,
}) => {
  const { userPosts, fetchPosts } = useFetchUserPosts(user, posts);

  const [loaded, setLoaded] = useState(false);
  const [postsLength, setPostsLength] = useState(0);
  const [idx, setIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const blurhash = userPosts[idx]?.blurhash;

  const averageColor = useMemo(() => {
    const color = Blurhash.getAverageColor(blurhash);
    return color
      ? `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}`
      : "0,0,0";
  }, [blurhash]);

  const changeUser = (user) => {
    setIdx(user?.idx);
    setCurrentPage(user?.currentPage);
  };

  const navigationUser = useMemo(() => {
    return usersNavigation.find((_user) => _user.id === user.id);
  }, [usersNavigation, user.id]);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleIndicatorFinish = useCallback(() => {
    goToNext(user?.id, changeUser);
  }, [goToNext, user?.id]);

  useEffect(() => {
    fetchPosts();
  }, [navigationUser?.currentPage]);

  useEffect(() => {
    setPostsLength(userPosts.length);
  }, [userPosts]);

  return (
    <View flex={1} justifyContent="space-between" overflow="hidden" br="$7">
      <FastImage
        resizeMode="cover"
        onLoad={handleLoad}
        source={{
          uri: `${URLS.CDN_POSTS_URL}${userPosts[idx]?.image}`,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={StyleSheet.absoluteFill}
      />
      {!loaded && blurhash && (
        <Blurhash
          style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
          decodeAsync
          blurhash={blurhash}
        />
      )}

      <UserCardHeader
        pause={!active}
        handleIndicatorFinish={handleIndicatorFinish}
        activeIdx={idx}
        pages={navigationUser?.paginationPages}
        post={userPosts[idx]}
        user={user}
        averageColor={averageColor}
        page={currentPage}
      /> 

      {postsLength > 1 && (
        <View f={1} flexDirection="row" zIndex="$1">
          <View f={1} onPress={() => goToPrevious(user?.id, changeUser)} />
          <View f={1} onPress={() => goToNext(user?.id, changeUser)} />
        </View>
      )}

      <UserCardActions averageColor={averageColor}  post={userPosts[idx]} /> 
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
