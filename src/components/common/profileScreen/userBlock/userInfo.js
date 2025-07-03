import GetNormalDate from "@lib/getNormalDate";
import { Dimensions } from "react-native";
import useInsets from "@hooks/useInsets";
import { memo } from "react";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { View, Text, getVariableValue } from "tamagui";
import Icon from "@components/ui/icon";

const { width } = Dimensions.get("window");

const iconColor = getVariableValue("$white", "color"); 
const nicknameStart = getVariableValue("$7", "size");
const nicknameAnimated = getVariableValue("$4", "size");
const nicknameStartLine = getVariableValue("$7", "lineHeight");
const marginBottomVar = getVariableValue("$5", "space");
const marginAnimatedBottomVar = getVariableValue("$3", "space");
const nicknameAnimatedLine = getVariableValue("$4", "lineHeight");

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

const UserInfo = memo(({ user, top, scrollY, viewHeight }) => { 
    const insets = useInsets();
    
    const animatedViewStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [width - viewHeight, width], [0.7 , 0.35], 'clamp');
        return {
            opacity,
        };
    });

    const animatedNicknameStyle = useAnimatedStyle(() => {
        const fontSize = interpolate(scrollY.value, [width - viewHeight, width], [nicknameStart , nicknameAnimated], 'clamp');
        const lineHeight = interpolate(scrollY.value, [width - viewHeight, width], [nicknameStartLine , nicknameAnimatedLine], 'clamp');
        const marginBottom = interpolate(scrollY.value, [width - viewHeight, width], [marginBottomVar , marginAnimatedBottomVar], 'clamp');
        return {
            fontSize, 
            lineHeight,
            marginBottom
        };
    });

    return (
        <View pt={top} w='$full' alignItems='center' pb="$5" ph='$6'>
            <AnimatedText style={animatedNicknameStyle} fz='$7' lh='$7' fw='$3'>
                {user?.nickname || user?.username}
            </AnimatedText>
            <AnimatedView style={animatedViewStyle} opacity={0.7} flexDirection='row' alignItems='center' gap='$5'>
                <View flexDirection='row' alignItems='center' gap='$2'>
                    <Icon icon='profile' size={18} color={iconColor} />
                    <Text fz='$2' lh='$2' fw='$2' color='$white'>
                        {user?.subscribers}
                    </Text>
                </View>
                <View br='$7' w='$0.5' h='$0.5' backgroundColor='$white' />
                <View flexDirection='row' alignItems='center' gap='$2'>
                    <Icon icon='clock' size={18} color={iconColor} />
                    <Text fz='$2' lh='$2' fw='$2' color='$white'>
                        {GetNormalDate(user?.date)}
                    </Text>
                </View>
            </AnimatedView>
        </View>
    );
});

export default UserInfo;
