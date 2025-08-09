import { Image, Text, YStack } from "tamagui";
import { useTranslation } from "react-i18next";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import { fastSpring } from "@constants/easings";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

const AuthScreenTitle = ({ title, source, shadowed }) => {
	const { t } = useTranslation();
    const opacity = useSharedValue(shadowed ? 0.5 : 1);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    useEffect(() => {
        opacity.value = withSpring(shadowed ? 0.5 : 1, fastSpring);
    }, [shadowed]);
	return (
		<AnimatedYStack style={animatedStyle} w="$full" justifyContent="center" gap="$6" alignItems="center">
            <Image
                source={source}
                w="$23.5"
                h="$23.5"
            />
			<Text fz="$9" lh="$9" w="$full" textAlign="center" fw="$3" color="$color" ta="center">
				{t(`auth.${title}`)}
			</Text>
		</AnimatedYStack>
	);
};

export default AuthScreenTitle;
