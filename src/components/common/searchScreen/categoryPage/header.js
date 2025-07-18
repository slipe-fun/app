import { View, Text, YStack, getVariableValue } from "tamagui";
import Icon from "@components/ui/icon";
import { LinearGradient } from "tamagui/linear-gradient";
import CategoryPageHeaderActions from "./headerActions";
import { StyleSheet } from "react-native";
import { useState, useCallback, memo } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";
import { Blurhash } from "react-native-blurhash";
import FastImage from "react-native-fast-image";
import useSearchStore from "@stores/searchScreen";
import { Dimensions } from "react-native";
import useInsets from "@hooks/ui/useInsets";

const {width} = Dimensions.get("window");

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedText = Animated.createAnimatedComponent(Text); 

const heightVar = getVariableValue("$12", "size");
const paddingVar = getVariableValue("$6", "space");
const fontBigVar = getVariableValue("$7", "size");
const fontSmallVar = getVariableValue("$4", "size");
const lineHeightBigVar = getVariableValue("$7", "lineHeight");
const lineHeightSmallVar = getVariableValue("$4", "lineHeight");
const gapBigVar = getVariableValue("$4", "space");
const gapSmallVar = getVariableValue("$2", "space");

const headerHeight = width * (3/4);

const CategoryPageHeader = memo(({ category, scrollY }) => { 
  const insets = useInsets(); 

  const calculatedInnerHeight = insets.top + paddingVar + heightVar;

  const statistics = useSearchStore((state) => state.statistics);

  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const animatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, headerHeight - calculatedInnerHeight], [1, 0.35], "clamp");
    return {
      opacity,
    };
  }, []);

  const animatedHeight = useAnimatedStyle(() => {
      const height = interpolate(scrollY.value, [0, headerHeight - calculatedInnerHeight], [headerHeight, calculatedInnerHeight], "clamp");
      return {height}
  })

  const animatedFontSize = useAnimatedStyle(() => {
    const fontSize = interpolate(scrollY.value, [0, headerHeight - calculatedInnerHeight], [fontBigVar, fontSmallVar], "clamp");
    const lineHeight = interpolate(scrollY.value, [0, headerHeight - calculatedInnerHeight], [lineHeightBigVar, lineHeightSmallVar], "clamp");
    return {
      fontSize,
      lineHeight,
    };
  }, []);

  const animatedGap = useAnimatedStyle(() => {
    const gap = interpolate(scrollY.value, [0, headerHeight - calculatedInnerHeight], [gapBigVar, gapSmallVar], "clamp");
    return {
      gap,
    };
  }, []);

  const categoryStatistics = statistics?.find(cat => cat?.category === category?.name?.toLowerCase());
  const topNumber = statistics?.indexOf(categoryStatistics) + 1

  return (
    <AnimatedView
      w="$full"
      left={0}
      right={0}
      position="absolute"
      h={headerHeight}
      style={animatedHeight}
      borderBottomLeftRadius="$12"
      backgroundColor="$black"
      zIndex={300}
      borderBottomRightRadius="$12"
      justifyContent="flex-end"
      overflow="hidden"
    >
        <CategoryPageHeaderActions blurhash={category?.blurhash} />
        <AnimatedFastImage
          resizeMode="cover"
          onLoad={handleLoad}
          source={{
            uri: category?.thumbnail,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={[StyleSheet.absoluteFill, animatedOpacity]}
        />
        {!loaded && category?.blurhash && (
          <Blurhash
            style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
            decodeAsync
            blurhash={category?.blurhash}
          />
        )}
      <AnimatedYStack style={animatedGap} w="$full" p="$6" alignItems="center">
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
        <AnimatedText fw="$3" color="$white" style={animatedFontSize}>
          {category.name}
        </AnimatedText>
        <View opacity={0.7} flexDirection="row" alignItems="center" gap="$5">
          <View flexDirection="row" alignItems="center" gap="$2">
            <Icon icon="crown" size={17} />
            <Text fz="$2" lh="$2" fw="$3" color="$white">
              TOP {topNumber || 16}
            </Text>
          </View>
          <View br="$7" w="$0.5" h="$0.5" backgroundColor="$white" />
          <View flexDirection="row" alignItems="center" gap="$2">
            <Icon icon="blogs" size={17} />
            <Text fz="$2" lh="$2" fw="$2" color="$white">
              {
                statistics?.find(
                  (o) => o.category === category.name.toLowerCase()
                )?.post_count
              }
            </Text>
          </View>
        </View>
      </AnimatedYStack>
    </AnimatedView>
  );
});

export default CategoryPageHeader;
