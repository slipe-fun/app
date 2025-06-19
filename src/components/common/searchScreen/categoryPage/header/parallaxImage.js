import { Image, View } from "tamagui";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useEffect } from "react";
import { accelerometer } from "react-native-sensors";
import { map } from "rxjs/operators";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedImage = Animated.createAnimatedComponent(Image);

const toDegrees = (radians) => radians * (180 / Math.PI);
const lerp = (a, b, t) => a + (b - a) * t;

const HeaderParallaxImage = ({ category }) => {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  let lastX = 0;
  let lastY = 0;
  const smoothFactor = 0.12;

  useEffect(() => {
    const sub = accelerometer
      .pipe(
        map(({ x, y, z }) => {
          const angleX = toDegrees(Math.atan2(y, z));
          const angleY = toDegrees(Math.atan2(x, z)) * -1;
          return { angleX, angleY };
        })
      )
      .subscribe(({ angleX, angleY }) => {
        lastX = lerp(lastX, angleX, smoothFactor);
        lastY = lerp(lastY, angleY, smoothFactor);

        rotateX.value = lastX * 0.3;
        rotateY.value = lastY * 0.3;
      });

    return () => sub.unsubscribe();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  return (
    <AnimatedView
      flex={1}
      alignItems="center"
      justifyContent="center"
      entering={FadeInDown.delay(150)
        .springify()
        .mass(0.5)
        .damping(15)
        .stiffness(100)}
    >
      <AnimatedImage
        source={category.thumbnail}
        style={[{ height: "120%", aspectRatio: "1/1" }, animatedStyle]}
      />
    </AnimatedView>
  );
};

export default HeaderParallaxImage;
