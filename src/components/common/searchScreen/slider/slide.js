import { Button, Text, XStack, View } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import FastImage from "react-native-fast-image";
import { StyleSheet } from "react-native";
import { URLS } from "@constants/urls";
import { useNavigation } from "@react-navigation/native";
import MediaPreview from "@components/ui/mediaPreview";
import { useTranslation } from "react-i18next";

const SearchSliderSlide = ({ isActive, title, posts }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const post = posts[0];

  return (
    <View
      onPress={() =>
        navigation.navigate("category_Page", {
          category: {
            blurhash: post?.blurhash,
            thumbnail: `${URLS.CDN_POSTS_URL}${post?.image}`,
            title: title,
            isSlides: true,
            posts
          },
        })
      }
      justifyContent="flex-end"
      f={1}
    >
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
      <MediaPreview
        media={post?.image}
        blurhash={post?.blurhash}
        priority={FastImage.priority.high}
        isVideoEnable
        active={isActive}
        muted
      />
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
            {t('search.slideOpen')}
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
