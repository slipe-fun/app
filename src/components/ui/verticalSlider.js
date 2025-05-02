import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { View, Dimensions, Animated } from "react-native";
import { FlashList } from "@shopify/flash-list";
import UserCard from "../common/blogsScreen/userCard";
import styles from "./styles/verticalSliderStyles";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 50 };
const SPACING = 16;

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const VerticalSlider = ({ users, onSlideChange = () => {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(windowHeight);
  const ITEM_LENGTH = useMemo(() => containerHeight + SPACING, [containerHeight]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleLayout = useCallback((e) => {
    const { height } = e.nativeEvent.layout;
    if (height > 0 && height !== containerHeight) {
      setContainerHeight(height);
      setActiveIndex(0);
      onSlideChange(0);
    }
  }, [containerHeight, onSlideChange]);

  const onViewRef = useRef(({ viewableItems }) => {
    const idx = viewableItems[0]?.index;
    if (idx != null && idx !== activeIndex) {
      setActiveIndex(idx);
      onSlideChange(idx);
    }
  }).current;

  const getItemLayout = useCallback((_, index) => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * index,
    index,
  }), [ITEM_LENGTH]);

  const keyExtractor = useCallback((_, index) => String(index), []);

  const renderItem = useCallback(({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_LENGTH,
      index * ITEM_LENGTH,
      (index + 1) * ITEM_LENGTH,
    ];

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.35, 1, 0.35],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          height: containerHeight,
          width: windowWidth,
          marginBottom: SPACING,
          opacity,
        }}
      >
        <UserCard
          user={item.author}
          posts={item.posts}
          active={index === activeIndex}
        />
      </Animated.View>
    );
  }, [activeIndex, containerHeight, scrollY, ITEM_LENGTH]);

  return (
    <View style={styles.outerContainer} onLayout={handleLayout}>
      <AnimatedFlashList
        data={users}
        extraData={activeIndex}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        estimatedItemSize={ITEM_LENGTH}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        maxToRenderPerBatch={2}
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={ITEM_LENGTH}
        getItemLayout={getItemLayout}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewRef}
        viewabilityConfig={VIEWABILITY_CONFIG}
        contentContainerStyle={{ paddingBottom: SPACING }}
      />
    </View>
  );
};

export default VerticalSlider;
