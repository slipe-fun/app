import { useState, useRef, useCallback, useMemo, memo } from "react";
import { Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { View } from "tamagui";
import UserCard from "@components/common/blogsScreen/userCard";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 50 };

const SliderItem = memo(
  ({ item, index, isActive, containerHeight }) => {

    return (
      <View id={String(index + item?.author?.id)} h={containerHeight} w={windowWidth} mb="$6">
        <UserCard user={item.author} posts={item.posts} active={isActive} />
      </View>
    );
  }
);

const VerticalSlider = ({ users, onSlideChange = () => {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(windowHeight);
  const ITEM_LENGTH = useMemo(() => containerHeight + 16, [containerHeight]);

  const handleLayout = useCallback(
    (e) => {
      const { height } = e.nativeEvent.layout;
      if (height > 0 && height !== containerHeight) {
        setContainerHeight(height);
        setActiveIndex(0);
        onSlideChange(0);
      }
    },
    [containerHeight, onSlideChange]
  );

  const onViewRef = useRef(({ viewableItems }) => {
    const idx = viewableItems[0]?.index;
    if (idx != null && idx !== activeIndex) {
      setActiveIndex(idx);
      onSlideChange(idx);
    }
  }).current;

  const keyExtractor = useCallback((_, index) => String(index), []);

  const renderItem = useCallback(
    ({ item, index }) => (
      <SliderItem
        item={item}
        index={index}
        isActive={index === activeIndex}
        containerHeight={containerHeight}
      />
    ),
    [activeIndex, containerHeight]
  );

  return (
    <View f={1} overflow="hidden" br="$11" onLayout={handleLayout}>
      <FlashList
        data={users}
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
        viewabilityConfig={VIEWABILITY_CONFIG}
        onViewableItemsChanged={onViewRef}
        contentContainerStyle={{ paddingBottom: 16 }}
        overScrollMode="never"
      />
    </View>
  );
};

export default VerticalSlider;