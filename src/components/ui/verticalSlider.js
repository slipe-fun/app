import React, { useState, useRef, useEffect } from "react";
import { View, Animated, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import styles from "./styles/verticalSliderStyles";

const VerticalSlider = ({ users, onSlideChange = () => {}, RenderSlideComponent }) => {
	const [containerHeight, setContainerHeight] = useState(Dimensions.get("window").height);
	const [activeIndex, setActiveIndex] = useState(0);
	const scrollY = useRef(new Animated.Value(0)).current;
	const listRef = useRef(null);

	const handleLayout = e => {
		const { height } = e.nativeEvent.layout;
		if (height && height !== containerHeight) {
			setContainerHeight(height);
			listRef.current?.scrollToOffset({ offset: 0, animated: false });
			setActiveIndex(0);
			onSlideChange(0);
		}
	};

	useEffect(() => {
		const id = scrollY.addListener(({ value }) => {
			const index = Math.round(value / containerHeight);
			if (index !== activeIndex) {
				setActiveIndex(index);
				onSlideChange(index);
			}
		});
		return () => scrollY.removeListener(id);
	}, [containerHeight, activeIndex]);

	const renderItem = ({ item, index }) => {
		const isActive = index === activeIndex;
		return (
			<View style={{ height: containerHeight }}>
				<RenderSlideComponent user={item.author} posts={item.posts} active={isActive} />
			</View>
		);
	};

	return (
		<View style={styles.outerContainer} onLayout={handleLayout}>
			<Animated.View style={{ flex: 1 }}>
				<FlashList
					ref={listRef}
					data={users}
					keyExtractor={(_, index) => String(index)}
					renderItem={renderItem}
					estimatedItemSize={containerHeight}
					showsVerticalScrollIndicator={false}
					initialNumToRender={4}
					maxToRenderPerBatch={2}
					pagingEnabled
					decelerationRate="fast"
					snapToAlignment="start"
					snapToInterval={containerHeight}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: true }
					)}
					getItemLayout={(_, index) => ({
						length: containerHeight,
						offset: containerHeight * index,
						index,
					})}
				/>
			</Animated.View>
		</View>
	);
};

export default VerticalSlider;
