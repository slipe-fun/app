import { View, Text, YStack, getVariableValue } from "tamagui";
import { memo, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import FastImage from "react-native-fast-image";
import { Blurhash } from "react-native-blurhash";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "@components/ui/icon";
import CategoryPageHeaderActions from "./headerActions";
import useSearchStore from "@stores/searchScreen";
import useInsets from "@hooks/ui/useInsets";
import useCategoryAnimations from "@hooks/ui/useCategoryAnimations";
import { getCategoryStats } from "@lib/getCategoryStats";

const { width } = Dimensions.get("window");
const headerHeight = width * 0.75;

const sizes = {
  height: getVariableValue("$12", "size"),
  padding: getVariableValue("$6", "space"),
  fontBig: getVariableValue("$7", "size"),
  fontSmall: getVariableValue("$4", "size"),
  lineBig: getVariableValue("$7", "lineHeight"),
  lineSmall: getVariableValue("$4", "lineHeight"),
  gapBig: getVariableValue("$4", "space"),
  gapSmall: getVariableValue("$2", "space"),
};

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const CategoryPageHeader = memo(({ category, scrollY }) => {
  const insets = useInsets();
  const [loaded, setLoaded] = useState(false);

  const calculatedInnerHeight = insets.top + sizes.padding + sizes.height;
  const animationRange = [0, headerHeight - calculatedInnerHeight];

  const { opacityStyle, heightStyle, fontStyle, gapStyle, gradientStyle } =
    useCategoryAnimations(
      scrollY,
      animationRange,
      sizes,
      headerHeight,
      calculatedInnerHeight,
      category?.isSlides
    );

  const statistics = useSearchStore((state) => state.statistics);
  const { topNumber, postCount } = getCategoryStats(statistics, category?.name);

  return (
    <AnimatedView
      w="$full"
      left={0}
      right={0}
      position="absolute"
      style={heightStyle}
      h={headerHeight}
      backgroundColor="$black"
      borderBottomLeftRadius="$12"
      borderBottomRightRadius="$12"
      zIndex={300}
      justifyContent="flex-end"
      overflow="hidden"
    >
      <CategoryPageHeaderActions
        isSlides={category?.isSlides}
        blurhash={category?.blurhash}
      />

      <AnimatedView style={[opacityStyle, StyleSheet.absoluteFill]}>
          <FastImage
            resizeMode="cover"
            onLoad={() => setLoaded(true)}
            source={{
              uri: category?.thumbnail,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            style={StyleSheet.absoluteFill}
          />
        {!loaded && category?.blurhash && (
          <Blurhash
            style={StyleSheet.absoluteFill}
            decodeAsync
            blurhash={category?.blurhash}
          />
        )}
      </AnimatedView>
      <AnimatedYStack
        minHeight="$12"
        justifyContent="center"
        style={gapStyle}
        w="$full"
        p={category?.isSlides ? "$8" : "$6"}
        alignItems="center"
      >
        <AnimatedLinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={[StyleSheet.absoluteFill, gradientStyle]}
        />

        <AnimatedText
          w="$full"
          textAlign="center"
          fw="$3"
          color="$white"
          style={fontStyle}
        >
          {category?.title}
        </AnimatedText>

        {!category?.isSlides && (
          <View opacity={0.7} flexDirection="row" alignItems="center" gap="$5">
            <View flexDirection="row" alignItems="center" gap="$2">
              <Icon icon="crown" size={17} />
              <Text fz="$2" lh="$2" fw="$3" color="$white">
                TOP {topNumber}
              </Text>
            </View>

            <View br="$7" w="$0.5" h="$0.5" backgroundColor="$white" />

            <View flexDirection="row" alignItems="center" gap="$2">
              <Icon icon="blogs" size={17} />
              <Text fz="$2" lh="$2" fw="$2" color="$white">
                {postCount}
              </Text>
            </View>
          </View>
        )}
      </AnimatedYStack>
    </AnimatedView>
  );
});

export default CategoryPageHeader;
