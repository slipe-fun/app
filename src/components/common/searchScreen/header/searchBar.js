import { useCallback, useRef, useEffect, useState } from "react";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import { View, XStack, Text, Input, useTheme, Button } from "tamagui";
import Icon from "../../../ui/icon";
import useSearchStore from "@stores/searchScreen";
import { useTranslation } from "react-i18next";

const AnimatedView = Animated.createAnimatedComponent(View);

const SearchBar = () => {
	const theme = useTheme();
	const ref = useRef();
	const inputRef = useRef();
	const { t } = useTranslation();
	const [cancelWidth, setCancelWidth] = useState(0);
	const cancelOpacity = useSharedValue(0);
	const cancelMarginRight = useSharedValue(0);
	const query = useSearchStore(state => state.query);
	const setQuery = useSearchStore(state => state.setQuery);
	const isFocused = useSearchStore(state => state.isFocused);
	const setIsFocused = useSearchStore(state => state.setIsFocused);
	const setIsSearch = useSearchStore(state => state.setIsSearch);
	const isSearch = useSearchStore(state => state.isSearch);

	const color = theme.secondaryText.get();

	const cancelStyle = useAnimatedStyle(() => ({
		marginRight: -cancelMarginRight.value,
		opacity: cancelOpacity.value,
	}));

	const onCancelPressed = useCallback(type => {
		setIsFocused(type === "cancel" ? false : true);
		if (type === "cancel") {
			setQuery("");
			if (inputRef?.current) {
				inputRef.current.value = "";
			}
			inputRef.current?.blur();
		} else {
			inputRef.current?.focus();
		}
	}, []);

	useEffect(() => {
		if (cancelWidth === 0) return;

		cancelMarginRight.value = withSpring(isFocused ? 0 : cancelWidth + 16, {
			mass: 0.4,
			damping: 18,
			stiffness: 140,
			overshootClamping: false,
			restDisplacementThreshold: 0.1,
			restSpeedThreshold: 0.1,
		});

		cancelOpacity.value = withSpring(isFocused ? 1 : 0, {
			mass: 0.3,
			damping: 16,
			stiffness: 120,
		});
	}, [isFocused, cancelWidth]);

	useEffect(() => {
		setCancelWidth(ref.current?.getBoundingClientRect()?.width);
	}, []);

	useEffect(() => {
		if (isSearch) {
			inputRef.current?.blur();
		}
	}, [isSearch]);

	return (
		<XStack width='$full' gap='$6' alignItems='center'>
			<XStack flex={1} onPressIn={() => onCancelPressed("focus")} alignItems='center' backgroundColor='$backgroundTransparent' br='$full' h='$13'>
				<View gap='$4' width='$full' flex={1} flexDirection='row' ph='$4' pr='$0' alignItems='center'>
					<Icon size={22} icon='magnifyingglass' color={color} />
					<Input
						ref={inputRef}
						onSubmitEditing={() => {
							setIsSearch(true);
						}}
						value={query}
						onChangeText={setQuery}
						fz='$2'
						f={1}
						onFocus={() => {
							setIsFocused(true);
						}}
						onBlur={() => setIsFocused(false)}
						indicatorColor={color}
						placeholder={t("search.input")}
						placeholderTextColor={color}
						p='$0'
						borderWidth='$0'
						fw='$3'
						h='$13'
					/>
				</View>
			</XStack>

			<AnimatedView style={cancelStyle}>
				<Button onPressIn={() => onCancelPressed("cancel")} backgroundColor='$transparent' alignItems='center' ref={ref} p='$0' height='auto'>
					<Text fz='$4' lh='$4' fw='$2' color='$primary'>
						{t("search.inputCancel")}
					</Text>
				</Button>
			</AnimatedView>
		</XStack>
	);
};

export default SearchBar;
