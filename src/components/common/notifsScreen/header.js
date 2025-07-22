import { Text, XStack, YStack } from "tamagui";
import Icon from "@components/ui/icon";
import { useEffect, useRef } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTheme, getVariableValue } from "tamagui";
import { fastSpring, quickSpring } from "@constants/easings";
import { useNavigation } from "@react-navigation/native";
import useNotifsStore from "@stores/notifsScreen";
import useInsets from "@hooks/ui/useInsets";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { GradientBorder } from "@components/ui/gradientBorder";

const AnimatedText = Animated.createAnimatedComponent(Text);

const lineHeight = getVariableValue("$2", "lineHeight");
const gap = getVariableValue("$1", "space");

const NotifsHeader = ({ refresh, loading }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const ref = useRef(null);
  const insets = useInsets();

  const rotation = useSharedValue(0);

  const setHeaderHeight = useNotifsStore((state) => state.setHeaderHeight);

  const color = theme.color.get();

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const animatedLoadingTextStyle = useAnimatedStyle(() => ({
    opacity: withSpring(loading ? 1 : 0, quickSpring),
  }));

  const animatedTitleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(loading ? 0 : lineHeight - gap, quickSpring) }],
  }));

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setHeaderHeight(ref.current?.getBoundingClientRect()?.height);
  }, [])

  return (
    <XStack left={0} right={0} zIndex="$1" ref={ref} pt={insets.top} position="absolute" pb="$6" ph="$6" alignItems="center" justifyContent="space-between">
      <LinearGradient
        colors={["#000", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <GradientBorder
        p={0}
        justifyContent="center"
        alignItems="center"
        h="$13"
        w="$13"
        br="$full"
        onPress={handleBack}
        backgroundColor="$glassButton"
        pressStyle={{
          scale: 0.9,
        }}
      >
        <Icon size={26} icon="chevronLeft" color={color} />
      </GradientBorder>
      <YStack gap='$1' h="$12" justifyContent="center" alignItems="center">
        <AnimatedText color="$color" fw="$3" fz="$5" lh="$5" style={animatedTitleStyle}>
          Уведомления
        </AnimatedText>
        <AnimatedText color="$transparentText" fw="$2" fz="$2" lh="$2" style={animatedLoadingTextStyle}>
          Загрузка...
        </AnimatedText>
      </YStack>
      <GradientBorder
        p={0}
        justifyContent="center"
        alignItems="center"
        h="$13"
        w="$13"
        pointerEvents={loading ? "none" : "auto"}
        br="$full"
        backgroundColor="$glassButton"
        pressStyle={{
          scale: 0.9,
        }}
        onPress={() => {
          rotation.value = withSpring(rotation.value + 180, fastSpring);
          refresh();
        }}
      >
        <Animated.View style={animatedIconStyle}>
          <Icon size={28} icon="reload" color={color} />
        </Animated.View>
      </GradientBorder>
    </XStack>
  );
};

export default NotifsHeader;
