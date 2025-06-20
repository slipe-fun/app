import { useState, useEffect } from "react";
import { Button, Image, getVariableValue } from "tamagui";
import { Image as RNImage } from "react-native";
import { URLS } from "@constants/urls";
import { GradientBorder } from "./gradientBorder";
import * as Haptics from "expo-haptics";

const Post = ({ post, width }) => {
  const [h, setH] = useState(0);
  const readyImage = `${URLS.CDN_POSTS_URL}${post.image}`;
  const borderRadius = getVariableValue("$7", "radius");

  useEffect(() => {
    RNImage.getSize(readyImage, (w, h0) => setH((width * h0) / w));
  }, [post.image]);

  return h ? (
    <Button
      unstyled
      m="$3"
      p="$0"
      overflow="hidden"
      br="$7"
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
      <GradientBorder
        borderWidth={1.5}
        style={{
          height: h <= 0 ? 220 : h,
        }}
        borderRadius={borderRadius}
      >
        <Image
          source={{ uri: readyImage }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundPosition: "center",
          }}
        />
      </GradientBorder>
    </Button>
  ) : // <View style={{height: h, margin: 8 }}>
  //   <Image
  //     source={{ uri: readyImage }}
  //     style={{ width: "100%", height: "100%", objectFit: "cover", backgroundPosition: "center" }}
  //   />
  // </View>
  null;
};

export default Post;
