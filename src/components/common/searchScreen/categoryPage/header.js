import { View, getVariableValue } from "tamagui";
import { memo, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import CategoryPageHeaderActions from "./headerActions";
import useSearchStore from "@stores/searchScreen";
import useInsets from "@hooks/ui/useInsets";
import useCategoryAnimations from "@hooks/ui/animations/useCategoryAnimations";
import { getCategoryStats } from "@lib/getCategoryStats";
import CategoryPageHeaderInfo from "./headerInfo";
import { LinearGradient } from "expo-linear-gradient";
import MediaPreview from "@components/ui/mediaPreview";
import FastImage from "@d11/react-native-fast-image";

const { width } = Dimensions.get("window");
const headerHeight = width * 0.8;

const sizes = {
  height: getVariableValue("$13", "size"),
  padding: getVariableValue("$6", "space"),
  fontBig: getVariableValue("$7", "size"),
  paddingDiffrence: getVariableValue("$3", "space"),
  fontSmall: getVariableValue("$4", "size"),
  gapBig: getVariableValue("$4", "space"),
  sizeSmall: getVariableValue("$4.5", "size"),
};

const AnimatedView = Animated.createAnimatedComponent(View);

const CategoryPageHeader = memo(({ category, scrollY }) => {
  const insets = useInsets();

  const calculatedInnerHeight = insets.top + sizes.padding + sizes.height;
  const animationRange = [0, headerHeight - calculatedInnerHeight];

  const { opacityStyle, heightStyle, fontStyle } = useCategoryAnimations(
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
    <>
      <AnimatedView
        w="$full"
        left={0}
        right={0}
        top={0}
        position="absolute"
        style={heightStyle}
        h={headerHeight}
        zIndex="$1"
        justifyContent="flex-end"
        overflow="hidden"
      >
        <View
          overflow="hidden"
          borderBottomLeftRadius="$12"
          borderBottomRightRadius="$12"
          style={[opacityStyle, StyleSheet.absoluteFill]}
        >
          <AnimatedView style={[opacityStyle, StyleSheet.absoluteFill, {zIndex: 10}]}>
            <MediaPreview priority={FastImage.priority.high} type="category" blurhash={category?.blurhash} media={category?.thumbnail}/>
          </AnimatedView>
          <LinearGradient
            colors={["#000", "transparent"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              zIndex: 1,
              bottom: 0,
              height: calculatedInnerHeight,
            }}
          />
        </View>
        <CategoryPageHeaderInfo
          category={category}
          topNumber={topNumber}
          postCount={postCount}
          opacityStyle={opacityStyle}
          fontStyle={fontStyle}
        />
      </AnimatedView>
      <CategoryPageHeaderActions
        isSlides={category?.isSlides}
        blurhash={category?.blurhash}
      />
    </>
  );
});

export default CategoryPageHeader;
