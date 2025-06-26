import React, { useState, useRef, useCallback, useMemo } from "react";
import { View, Dimensions } from "react-native";
import { FlatList } from "react-native"
import UserCard from "../common/blogsScreen/userCard";
import styles from "./styles/verticalSliderStyles";
import usePostNavigation from "@hooks/usePostNavigation";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 50 };
const SPACING = 16;

const VerticalSlider = ({ users, onSlideChange = () => { } }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [containerHeight, setContainerHeight] = useState(windowHeight);
	const ITEM_LENGTH = useMemo(() => containerHeight + SPACING, [containerHeight]);

	const {
		users: usersNavigation,
		goToNext,
		goToPrevious
	} = usePostNavigation(users);

	const handleLayout = useCallback(
		e => {
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

	const getItemLayout = useCallback(
		(_, index) => ({
			length: ITEM_LENGTH,
			offset: ITEM_LENGTH * index,
			index,
		}),
		[ITEM_LENGTH]
	);

	const keyExtractor = useCallback((_, index) => String(index), []);

	const renderItem = useCallback(
		({ item, index }) => {
			return (
				<View
					id={String(index + item?.author?.id)}
					style={{
						height: containerHeight,
						width: windowWidth,
						marginBottom: SPACING,
					}}
				>
					<UserCard
						user={item.author}
						posts={item.posts}
						active={index === activeIndex}
						usersNavigation={usersNavigation}
						goToNext={goToNext}
						goToPrevious={goToPrevious}
					/>
				</View>
			);
		},
		[activeIndex, containerHeight, usersNavigation, ITEM_LENGTH]
	);

	return (
		<View style={styles.outerContainer} onLayout={handleLayout}>
			<FlatList
				overScrollMode="never"
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
				snapToAlignment='start'
				snapToInterval={ITEM_LENGTH}
				getItemLayout={getItemLayout}
				onViewableItemsChanged={onViewRef}
				viewabilityConfig={VIEWABILITY_CONFIG}
				contentContainerStyle={{ paddingBottom: SPACING }}
			/>
		</View>
	);
};

export default VerticalSlider;
