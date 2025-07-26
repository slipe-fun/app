import { View, Text, YStack } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import Indicators from "./indicators";
import Icon from "@components/ui/icon";
import { toast } from "sonner-native";
import { StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import sendReport from "@lib/sendReport";
import MediaPreview from "@components/ui/mediaPreview";
import { GradientBorder } from "@components/ui/gradientBorder";

const UserCardHeader = ({
  user,
  post,
  postCount,
  activeIdx,
  duration,
  handeSlideClick,
  pause,
}) => {

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
    <View w="$full" position="relative" p="$6" pt="$8" gap="$6">
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <Indicators
        postsLength={postCount}
        isPaused={pause}
        onFinish={() => handeSlideClick("right")}
        currentIndex={activeIdx}
        userId={user.id}
        duration={duration}
      />
      <View
        w="$full"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <View w="$12" h="$12" br="$full" overflow="hidden" position="relative">
          {user?.avatar ? (
            <MediaPreview type="avatar" blurhash={user?.avatar_information?.blurhash} media={user?.avatar}/>
          ) : (
            <View
              backgroundColor="$black"
              justifyContent="center"
              alignItems="center"
              f={1}
              br="$full"
            >
              <Icon icon="profile" size={22} />
            </View>
          )}
        </View>
        <YStack flex={1} gap="$1" alignItems="center" justifyContent="center">
          <Text fz="$2" lh="$2" fw="$3" color="$white">
            {user?.nickname || `${user?.username}`}
          </Text>
          <Text numberOfLines={1} textOverflow="ellipsis" w="$full" fz="$1" lh="$1" fw="$2" color="$transparentText">
            {post?.in_search}
          </Text>
        </YStack>
        <GradientBorder
          isButton
          h="$12"
          justifyContent="center"
          alignItems="center"
          w="$12"
          onPress={handlePress}
          br="$full"
          backgroundColor="$glassButtonStatic"
        >
          <Icon icon="flag" size={22} />
        </GradientBorder>
      </View>
    </View>
  );
};

export default UserCardHeader;