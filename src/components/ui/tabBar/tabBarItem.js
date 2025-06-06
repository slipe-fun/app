import { useEffect } from "react";
import { View } from "react-native";
import { styles } from "../styles/tabBarStyles";
import { Pressable } from "react-native-gesture-handler";
import Icon from "../icon";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolateColor, useAnimatedProps } from "react-native-reanimated";
import { COLORS } from "../../../constants/theme";

const TabBarItem = ({ route, isFocused, onPress, iconName }) => {
    const opacityValue = useSharedValue(isFocused ? 1 : 0.35);
    const colorValue = useSharedValue(isFocused ? 1 : 0);

    const buttonOpacityStyles = useAnimatedStyle(() => {
        return {
            opacity: opacityValue.value,
        };
    });

    const buttonColorStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(colorValue.value, [0, 1], [COLORS.elemBackground, COLORS.white]),
        };
    });

    const buttonIconColorProps = useAnimatedProps(() => {
        return {
            fill: interpolateColor(colorValue.value, [0, 1], [COLORS.white, COLORS.black]),
        };
    });

    useEffect(() => {
        opacityValue.value = withTiming(isFocused ? 1 : 0.35, { duration: 150, easing: Easing.ease });
        colorValue.value = withTiming(isFocused ? 1 : 0, { duration: 150, easing: Easing.ease });
    }, [isFocused, opacityValue, colorValue]);

    return (
            <Pressable style={styles.tabItem} onPress={onPress}>
                {route.name === "Publish" ? (
                    <Animated.View
                        style={[
                            styles.publishButton,
                            buttonColorStyles
                        ]}
                    >
                        <Icon icon={iconName} animatedProps={buttonIconColorProps} style={{ color: COLORS.white }} size={32} />
                    </Animated.View>
                ) : (
                    <Animated.View
                        style={[
                            styles.tabItem,
                            buttonOpacityStyles
                        ]}
                    >
                        <Icon icon={iconName} size={32} />
                    </Animated.View>
                )}
            </Pressable>
    );
};

export default TabBarItem;
