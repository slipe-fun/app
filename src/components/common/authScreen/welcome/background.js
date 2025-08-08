import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const AuthBackground = ({ opacity, image }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    position: "absolute",
    width: "100%",
    height: "100%",
  }));

  return (
    <>
      <AnimatedImage
        source={image}
        resizeMethod="scale"
        style={animatedStyle}
      />
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["rgba(0, 0, 0, 0.24)", "rgba(0, 0, 0, 1)"]}
      />
    </>
  );
};

export default AuthBackground;
