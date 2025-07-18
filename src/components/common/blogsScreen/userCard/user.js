import { View, Text } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import Indicators from "./indicators";
import { URLS } from "@constants/urls";
import { useState, useCallback } from "react";
import ColorfullyView from "@components/ui/colorfullyView";
import Icon from "@components/ui/icon";
import FastImage from "react-native-fast-image";
import { Blurhash } from "react-native-blurhash";
import { toast } from "sonner-native";
import * as Haptics from "expo-haptics";
import sendReport from "@lib/sendReport";

const UserCardHeader = ({
  user,
  post,
  postCount,
  activeIdx,
  duration,
  handeSlideClick,
  pause,
  averageColor,
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleIndicatorFinish = () => {
    handeSlideClick("right");
  };

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handlePress = () => {
    // TODO: PIP PLS ADD SOME GENIUS CODE FOR REPORTING RH
    // PIP: READY

    sendReport(post?.id).then(() => {
      toast.success("Репорт успешно отправлен!");
    }).catch(() => {
      toast.error("Репорт не отправлен!");
    })
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };

  return (
    <View w="$full" position="relative">
      <LinearGradient
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        colors={["rgba(0, 0, 0, 0.32)", "rgba(0, 0, 0, 0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <Indicators
        postsLength={postCount}
        isPaused={pause}
        onFinish={() => handleIndicatorFinish()}
        currentIndex={activeIdx}
        userId={user.id}
        duration={duration}
      />
      <View
        w="$full"
        pt="$6"
        p="$6.5"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <View w="$12" h="$12" br="$full" overflow="hidden" position="relative">
          {user?.avatar ? (
            <>
              <FastImage
                resizeMode="cover"
                onLoad={handleLoad}
                source={{
                  uri: URLS.CDN_AVATARS_URL + user?.avatar,
                  priority: FastImage.priority.normal,
                  cache: FastImage.cacheControl.immutable,
                }}
                style={StyleSheet.absoluteFill}
              />
              {!loaded && user?.avatar_information?.blurhash && (
                <Blurhash
                  style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
                  decodeAsync
                  blurhash={user?.avatar_information?.blurhash}
                />
              )}
            </>
          ) : (
            <View
              backgroundColor="$black"
              justifyContent="center"
              alignItems="center"
              w="$12"
              h="$12"
              br="$full"
            >
              <Icon icon="profile" size={22} />
            </View>
          )}
        </View>
        <View w="$full" gap="$1" alignItems="center" justifyContent="center">
          <Text fz="$2" lh="$2" fw="$3" color="$white">
            {user?.nickname || `${user?.username}`}
          </Text>
          <Text fz="$1" lh="$1" fw="$2" color="$transparentText">
            {post?.in_search}
          </Text>
        </View>
        <ColorfullyView
          isButton
          h="$12"
          justifyContent="center"
          alignItems="center"
          w="$12"
          onPress={handlePress}
          br="$full"
          color={averageColor}
          unstyled
        >
          <Icon icon="flag" size={22} />
        </ColorfullyView>
      </View>
    </View>
  );
};

export default UserCardHeader;
