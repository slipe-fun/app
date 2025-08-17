import { useState, useEffect, useRef } from "react";
import {
  useDerivedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  Canvas,
  Image,
  useImage,
  Group,
  Blur,
} from "@shopify/react-native-skia";
import { URLS } from "@constants/urls";
import Animated from "react-native-reanimated";
import { Blurhash } from "react-native-blurhash";
import { getVariableValue, View } from "tamagui";
import { StyleSheet } from "react-native";
import useInsets from "@hooks/ui/useInsets";
import { getFadeIn, getFadeOut } from "@constants/fadeAnimations";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedBlurhash = Animated.createAnimatedComponent(Blurhash);

const padding = getVariableValue("$6", "space");
const buttonSize = getVariableValue("$13", "size");

const ProfileAvatar = ({ scrollY, user }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [size, setSize] = useState(140);
  const ref = useRef();

  const insets = useInsets();

  const image = useImage(`${URLS.CDN_AVATARS_URL}${user?.avatar}`);

  useEffect(() => {
    if (image) {
      setIsLoaded(true);
    }
  }, [image]);

  const blur = useDerivedValue(() => {
    return interpolate(scrollY.value, [0, size + padding], [0, 16], "clamp");
  }, [scrollY]);

  const scale = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [0, size + padding],
            [1, 0.5],
            "clamp"
          ),
        },
      ],
      opacity: interpolate(scrollY.value, [0, size + padding], [1, 0], "clamp"),
    };
  }, [scrollY]);

  useEffect(() => {
    setSize(ref.current?.getBoundingClientRect()?.width);
  }, [ref]);

  return (
    <AnimatedView
      ref={ref}
      w="$24"
      zIndex="$2"
      mt={insets.top + (buttonSize / 2)}
      aspectRatio="1/1"
      transformOrigin="bottom"
      overflow="hidden"
      br="$full"
      style={scale}
    >
      <Canvas style={{ width: size, height: size }}>
        <Group origin={{ x: size / 2, y: size / 2 }}>
          <Image
            image={image}
            x={0}
            y={0}
            width={size}
            height={size}
            fit="cover"
          />
          <Blur blur={blur} />
        </Group>
      </Canvas>

      {!isLoaded && (
        <AnimatedBlurhash
          blurhash={user?.avatar_information?.blurhash}
          style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
          decodeAsync
          exiting={getFadeOut()}
          entering={getFadeIn()}
        />
      )}
    </AnimatedView>
  );
};

export default ProfileAvatar;
