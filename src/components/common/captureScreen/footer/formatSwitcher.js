import { normalSpring } from "@constants/easings";
import { useState, useRef, memo, useCallback, useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, interpolateColor, withSpring } from "react-native-reanimated";
import { XStack, Text, Button, View, useTheme } from "tamagui";

const formats = ["ФОТО", "ВИДЕО"];

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

const FormatButton = memo(({ format, index, selectedIndex, onSelect, onLayout }) => {
  const theme = useTheme();
  const inactiveColor = theme.secondaryText.get();
	const isActive = useSharedValue(index === selectedIndex ? 1 : 0);

	const animatedTextStyle = useAnimatedStyle(() => ({
		color: interpolateColor(isActive.value, [0, 1], [inactiveColor, 'white']),
	}));
	
	useEffect(() => {
		isActive.value = withSpring(index === selectedIndex ? 1 : 0, normalSpring);
	}, [selectedIndex]);

	return (
		<Button unstyled alignItems='center' justifyContent="center" backgroundColor='$transparent' ph='$7' h='$12' onPress={() => onSelect(index)} onLayout={onLayout}>
			<AnimatedText fw={500} style={animatedTextStyle}>
				{format}
			</AnimatedText>
		</Button>
	);
});

const CaptureFormatSwitcher = () => {
	const [selectedIndex, setSelectedIndex] = useState(1);

	const indicatorX = useSharedValue(0);
	const indicatorW = useSharedValue(0);

	const layouts = useRef([]);

	const onSelect = useCallback(index => {
		setSelectedIndex(index);
		const layout = layouts.current[index];
		if (layout) {
			indicatorX.value = withSpring(layout.x, normalSpring);
			indicatorW.value = withSpring(layout.width, normalSpring);
		}
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: indicatorX.value }],
		width: indicatorW.value,
	}));

	const handleLayout = useCallback(
		(index, e) => {
			const { x, width } = e.nativeEvent.layout;
			layouts.current[index] = { x, width };
			if (indicatorW.value === 0 && index === selectedIndex) {
				indicatorX.value = x;
				indicatorW.value = width;
			}
		},
		[selectedIndex]
	);

	return (
		<XStack f={1} borderRadius={20} justifyContent='center' alignItems='center' position='relative'>
			<AnimatedView position='absolute' left={0} right={0} height='$12' borderRadius='$full' backgroundColor='$primary' style={animatedStyle} />
			{formats.map((format, index) => (
				<FormatButton
					key={format}
					format={format}
					index={index}
					selectedIndex={selectedIndex}
					onSelect={onSelect}
					onLayout={e => handleLayout(index, e)}
				/>
			))}
		</XStack>
	);
};

export default CaptureFormatSwitcher;
