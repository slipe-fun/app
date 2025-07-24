import { useState, useRef, useCallback, useMemo, memo, useEffect } from "react";
import { Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import UserCard from "@components/common/blogsScreen/userCard";
import { View } from "tamagui";

const windowHeight = Dimensions.get("window").height;
const SPACING = 16;
const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 50 };

const SliderItem = ({ item, isActive, containerHeight }) => {
	return (
		<View h={containerHeight} w='$full' mb={SPACING}>
			<UserCard user={item.author} posts={item.posts} active={isActive} />
		</View>
	);
};

const VerticalSlider = ({ users, onSlideChange = () => {} }) => {
	const [activeIndex, setActiveIndex] = useState(0);
  const viewRef = useRef(null);
	const [containerHeight, setContainerHeight] = useState(windowHeight); 

	const ITEM_LENGTH = useMemo(() => containerHeight + SPACING, [containerHeight]);

	const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems?.length > 0) {
      const firstVisible = viewableItems[0];
      if (firstVisible.index !== null && firstVisible.index !== undefined) {
        setActiveIndex(firstVisible.index);
        onSlideChange(firstVisible.index); 
      }
    }
  };

	const renderItem = useCallback(
		({ item, index }) => <SliderItem item={item} index={index} isActive={index === activeIndex} containerHeight={containerHeight} />,
		[activeIndex, containerHeight]
	);

	const keyExtractor = useCallback((_, index) => String(index), []);

  useEffect(() => {
    const height = viewRef.current?.getBoundingClientRect()?.height;
    if (height > 0 && height !== containerHeight) {
      setContainerHeight(height); 
    }
  }, [])

	return ( 
		<View br='$12' overflow="hidden" f={1} ref={viewRef}>
			<FlashList
				data={users}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				estimatedItemSize={ITEM_LENGTH}
        pagingEnabled
        disableIntervalMomentum
				showsVerticalScrollIndicator={false}
				overScrollMode='never'
				initialNumToRender={4}
				maxToRenderPerBatch={2}
				snapToInterval={ITEM_LENGTH}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={VIEWABILITY_CONFIG}
				contentContainerStyle={{ paddingBottom: SPACING }}
				style={{ flex: 1 }}
			/>
		</View>
	);
};

export default VerticalSlider;