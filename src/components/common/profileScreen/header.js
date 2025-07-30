import { XStack } from "tamagui";
import Icon from "@components/ui/icon";
import Animated, {
    interpolate,
    useAnimatedStyle
} from "react-native-reanimated";
import { useTheme } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import useInsets from "@hooks/ui/useInsets";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { GradientBorder } from "@components/ui/gradientBorder";
import { useRef, useState, useEffect, memo } from "react";
import ProfileUserInfo from "./profileBlock/userInfo";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const ProfileHeader = ({ scrollY, back = false }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useInsets();

  const ref = useRef(null); 

  const color = theme.color.get();

  const [headerHeight, setHeaderHeight] = useState(0);

  const handleBack = () => {
    navigation.goBack();
  };

  const animatedLinearGradientStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, headerHeight], [0, 1]),
  }));

  useEffect(() => {
    setHeaderHeight(ref.current?.getBoundingClientRect()?.height);
  }, [])

  return (
    <XStack ref={ref} left={0} right={0} zIndex="$1" pt={insets.top} position="absolute" pb="$6" pr="$6" alignItems="center" pl={back ? "$6" : "$13"}>
      <AnimatedLinearGradient
        colors={["#000", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[StyleSheet.absoluteFill, animatedLinearGradientStyle]}
      />
      {back && (
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
      )}
      <ProfileUserInfo header scrollY={scrollY}/>
      <GradientBorder
        p={0}
        justifyContent="center"
        alignItems="center"
        h="$13"
        w="$13"
        br="$full"
        backgroundColor="$glassButton"
        pressStyle={{
          scale: 0.9,
        }}
      >
          <Icon size={28} icon="qrcode" color={color} />
      </GradientBorder>
    </XStack>
  );
};

export default memo(ProfileHeader);
