import { XStack, YStack, Text } from "tamagui";
import { useEffect, useState, useRef, memo } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, interpolate } from "react-native-reanimated";
import { quickSpring } from "@constants/easings";
import DummyIndicator from "./dummy";
import Indicator from "./indicator";

const AnimatedText = Animated.createAnimatedComponent(Text);

const Indicators = ({ paused = true, currentIndex = 0, postsLength, userId, progress }) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const opacity = useSharedValue(0);
    const ref = useRef(null);

    const indicatorWidth = containerWidth > 0 ? (containerWidth - (4 * postsLength - 1)) / postsLength : 0;

    const opacityStyle = useAnimatedStyle(
        () => ({
            transform: [{ translateY: interpolate(opacity.value, [0, 1], [-8, 0]) }],
            opacity: opacity.value,
        }),
        [paused]
    );

    useEffect(() => {
        if (ref.current?.getBoundingClientRect) {
            setContainerWidth(ref.current.getBoundingClientRect().width);
        }
    }, []);

    useEffect(() => {
        opacity.value = withSpring(paused ? 1 : 0, quickSpring);
    }, [paused]);

    return (
        <YStack ref={ref} w='$full' gap='$6'>
            <XStack w='$full' justifyContent='space-between'>
                {Array.from({ length: postsLength }, (_, index) =>
                    currentIndex === index ? (
                        <Indicator
                            key={`${userId}-${index}`}
                            containerWidth={containerWidth}
                            indicatorWidth={indicatorWidth}
                            progress={progress}
                            paused={paused}
                        />
                    ) : (
                        <DummyIndicator
                            key={`${userId}-${index}`}
                            paused={paused}
                            indicatorWidth={indicatorWidth}
                            finished={index < currentIndex}
                        />
                    )
                )}
            </XStack>
            <AnimatedText style={opacityStyle} left={0} right={0} textAlign='center' position='absolute' top='$7' color='$white' fz='$2' fw='$2' lh='$2'>
                Листайте для перемотки
            </AnimatedText>
        </YStack>
    );
};

export default memo(Indicators);
