import React, { useState, useRef, useEffect } from "react";
import { View, Animated, Dimensions } from "react-native";
import styles from "./styles/verticalSliderStyles";

const VerticalSlider = ({ users, onSlideChange = () => {}, RenderSlideComponent }) => {
	const [containerHeight, setContainerHeight] = useState(Dimensions.get("window").height);
	const [activeIndex, setActiveIndex] = useState(0);
	const scrollY = useRef(new Animated.Value(0)).current;
	const flatListRef = useRef(null);

	const handleLayout = e => {
		const { height } = e.nativeEvent.layout;
		if (height > 0 && height !== containerHeight) {
			setContainerHeight(height);
			flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
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
	}, [containerHeight, activeIndex, onSlideChange, scrollY]);

	const renderItem = ({ item, index }) => {
		const isActive = index === activeIndex;
		return (
			<View style={{ height: containerHeight }}>
				<RenderSlideComponent user={item.author} posts={item.posts} active={!isActive} />
			</View>
		);
	};

	return (
		<View style={styles.outerContainer} onLayout={handleLayout}>
			<Animated.FlatList
				ref={flatListRef}
				data={users}
				keyExtractor={(_, i) => i.toString()}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				scrollEventThrottle={16}
				pagingEnabled
				decelerationRate='fast'
				snapToInterval={containerHeight}
				snapToAlignment='start'
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
				getItemLayout={(_, index) => ({
					length: containerHeight,
					offset: containerHeight * index,
					index,
				})}
			/>
		</View>
	);
};

export default VerticalSlider;
