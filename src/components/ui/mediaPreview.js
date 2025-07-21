import { memo, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { URLS } from "@constants/urls";
import FastImage from "react-native-fast-image";
import { Blurhash } from "react-native-blurhash";
import Animated from "react-native-reanimated";
import { Video } from "react-native-video";
import { getFadeIn, getFadeOut } from "@constants/fadeAnimations";

const AnimatedBlurhash = Animated.createAnimatedComponent(Blurhash);

const MediaVideo = memo(({ source, active, muted, onLoad }) => (
  <Video
    source={source}
    repeat
    muted={muted}
    paused={!active}
    playInBackground={false}
    playWhenInactive={false}
    resizeMode="cover"
    style={StyleSheet.absoluteFill}
    onLoad={onLoad}
  />
));

const MediaImage = memo(({ source, blurhash, onLoad, loaded }) => {

  return (
    <>
      <FastImage
        resizeMode="cover"
        source={source}
        onLoadEnd={onLoad}
        style={StyleSheet.absoluteFill}
      />
      {!loaded && blurhash && (
        <AnimatedBlurhash
          exiting={getFadeOut()}
          entering={getFadeIn()}
          style={StyleSheet.absoluteFill}
          decodeAsync
          blurhash={blurhash}
        />
      )}
    </>
  );
});

const MediaPreview = ({
  media,
  blurhash,
  priority = FastImage.priority.normal,
  isVideoEnable = false,
  active = false,
  videoOnLoad,
  muted = false,
  type = "post",
}) => {
  const [loaded, setLoaded] = useState(false);

  const isVideo = useMemo(
    () => /\.(mp4|mov|webm|mkv|avi)$/i.test(media || ""),
    [media]
  );

  const handleLoad = (meta) => {
    setLoaded(true);
    videoOnLoad?.(meta);
  };

   const cdn_url = () => {
      switch (type) {
        case "avatar":
          return URLS.CDN_AVATARS_URL;
        case "category":
          return "";
        case "post":
          return URLS.CDN_POSTS_URL;
        default:
          return URLS.CDN_POSTS_URL;
      }
    };

  const uri = useMemo(() => `${cdn_url()}${media}`, [media]);

  const videoSource = useMemo(() => ({ uri }), [uri]);

  const imageSource = useMemo(
    () => ({
      uri,
      priority,
      cache: FastImage.cacheControl.immutable,
    }),
    [uri, priority]
  );

  if (isVideo && isVideoEnable) {
    return (
      <MediaVideo
        source={videoSource}
        active={active}
        muted={muted}
        onLoad={handleLoad}
      />
    );
  }

  return (
    <MediaImage
      source={imageSource}
      blurhash={blurhash}
      onLoad={handleLoad}
      loaded={loaded}
    />
  );
};

export default memo(MediaPreview);
