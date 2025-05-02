import React, { useState, useRef, useEffect, act } from "react";
import { View, Dimensions } from "react-native";
import UserCard from "../common/blogsScreen/userCard";
import { FlashList } from "@shopify/flash-list";
import styles from "./styles/verticalSliderStyles";

const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

const VerticalSlider = ({ users, onSlideChange = () => {} }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [containerHeight, setContainerHeight] = useState(Dimensions.get("window").height);

	const handleLayout = e => {
		const { height } = e.nativeEvent.layout;
		if (height > 0 && height !== containerHeight) {
			setContainerHeight(height);
			setActiveIndex(0);
			onSlideChange(0);
		}
	};

	const renderItem = ({ item, index }) => {
		return (
			<View style={{ height: containerHeight }}>
				<UserCard user={item.author} posts={item.posts} active={index === activeIndex} />
			</View>
		);
	};

	const onViewRef = useRef(({ viewableItems }) => {
		const idx = viewableItems[0]?.index;
		if (idx !== undefined && idx !== null) {
			onSlideChange(idx);
			setActiveIndex(idx);
		}
	});

	return (
		<View style={styles.outerContainer} onLayout={handleLayout}>
			<View style={{ flex: 1 }}>
				<FlashList
					data={users}
					extraData={activeIndex}
					keyExtractor={(_, index) => String(index)}
					renderItem={renderItem}
					estimatedItemSize={containerHeight}
					showsVerticalScrollIndicator={false}
					initialNumToRender={4}
					maxToRenderPerBatch={2}
					pagingEnabled
					decelerationRate='fast'
					snapToAlignment='start'
					snapToInterval={containerHeight}
					onViewableItemsChanged={onViewRef.current}
					viewabilityConfig={viewabilityConfig}
					getItemLayout={(_, index) => ({
						length: containerHeight,
						offset: containerHeight * index,
						index,
					})}
				/>
			</View>
		</View>
	);
};

export default VerticalSlider;
