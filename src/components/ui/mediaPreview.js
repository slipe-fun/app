import { memo, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { URLS } from "@constants/urls";
import FastImage from "react-native-fast-image";
import { Blurhash } from "react-native-blurhash";
import Animated from "react-native-reanimated";
import { Video } from "react-native-video";
import { getFadeOut } from "@constants/fadeAnimations";

const AnimatedBlurhash = Animated.createAnimatedComponent(Blurhash);

const MediaVideo = memo(({ source, paused, muted, onLoad }) => (
	<Video
		source={source}
		repeat
		muted={muted}
		paused={paused}
		playInBackground={false}
		playWhenInactive={false}
		resizeMode='cover'
		style={StyleSheet.absoluteFill}
		onLoad={onLoad}
	/>
));

const MediaImage = memo(({ uri, blurhash }) => {
  const [showBlur, setShowBlur] = useState(false);

  useEffect(() => {
    setShowBlur(false);
  }, [uri]);

  const handleLoadStart = () => {
    setShowBlur(true);
  };

  const handleLoadEnd = () => {
    setShowBlur(false);
  };

  return (
    <>
      <FastImage
        source={{
          uri,
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.normal,
        }}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
      {showBlur && blurhash && (
        <AnimatedBlurhash
          style={StyleSheet.absoluteFill}
          blurhash={blurhash}
          decodeAsync
          exiting={getFadeOut()}
        />
      )}
    </>
  );
});

const getCdnUrl = type => {
	switch (type) {
		case "avatar":
			return URLS.CDN_AVATARS_URL;
		case "category":
			return "";
		case "post":
		default:
			return URLS.CDN_POSTS_URL;
	}
};

const isVideoFile = media => /\.(mp4|mov|webm|mkv|avi)$/i.test(media || "");

const MediaPreview = memo(({ media, blurhash, isVideoEnable = false, paused = false, videoOnLoad, muted = false, type = "post" }) => {
	const [loaded, setLoaded] = useState(false);

	const cdnBase = getCdnUrl(type);
	const uri = `${cdnBase}${media}`; 

	const handleLoad = meta => {
		setLoaded(true);
		if (videoOnLoad) videoOnLoad(meta);
	};

	useEffect(() => {
		setLoaded(false);
	}, [uri]);

	if (isVideoEnable && isVideoFile(media)) {
		return <MediaVideo source={{ uri }} paused={paused} muted={muted} onLoad={handleLoad} />;
	}

	return <MediaImage uri={uri} blurhash={blurhash} onLoadEnd={handleLoad} loaded={loaded} />;
});

export default MediaPreview;
