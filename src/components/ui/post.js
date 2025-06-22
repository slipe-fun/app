import { useState, useEffect, memo } from "react";
import { Button, Image, View, getVariableValue } from "tamagui";
import { Image as RNImage } from "react-native";
import { URLS } from "@constants/urls";
import { GradientBorder } from "./gradientBorder";
import * as Haptics from "expo-haptics";
import FastImage from "react-native-fast-image";

const Post = ({ post, width }) => {
  const [h, setH] = useState(0);
  const readyImage = `${URLS.CDN_POSTS_URL}${post.image}`;
  const borderRadius = getVariableValue("$7", "radius");

  // useEffect(() => {
  //   RNImage.getSize(readyImage, (w, h0) => setH((width * h0) / w));
  // }, [post.image]);

  return (
    <Button
      unstyled
      m="$3"
      p="$0"
      overflow="hidden"
      br="$7"
      style={{
        height: 220,
      }}
      position="relative"
      animation="fast"
      backgroundColor="$transparent"
      pressStyle={{
        scale: 0.98,
        opacity: 0.9,
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      }}
    >
        <FastImage
          source={{ uri: readyImage }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            backgroundPosition: "center",
          }}
        />
    </Button>
  )
};

export default memo(Post);
