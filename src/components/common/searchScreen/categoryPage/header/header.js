import { View, Text, Image, Button, getVariableValue } from "tamagui";
import Icon from "@components/ui/icon";
import { Platform } from "react-native";
import { LinearGradient } from "tamagui/linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import useFetchCategoryPosts from "@hooks/useFetchCategoryPosts";
import { GradientBorder } from "@components/ui/gradientBorder";
import HeaderParallaxImage from "./parallaxImage";
import useFetchCategoryStatistics from "@hooks/useFetchCategoryStatistics";

const AnimatedView = Animated.createAnimatedComponent(View);

const CategoryPageHeader = ({ category, scrollY }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const borderRadius = getVariableValue("$7", "radius");
  const { statistics, isLoading, error } = useFetchCategoryStatistics();

  const { posts, setPage } = useFetchCategoryPosts(
    category?.name?.toLowerCase()
  );

  return (
    <GradientBorder
      style={{
        flexDirection: "column",
        alignItems: "stretch",
        width: "100%",
        aspectRatio: "1/1",
        overflow: "hidden",
        justifyContent: "space-between",
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
      }}
      borderWidth={1.5}
      gradientColors={[
        `${category.color}12`,
        "#00000000",
        `${category.color}12`,
      ]}
    >
      <LinearGradient
        alignSelf="stretch"
        flex={1}
        position="absolute"
        opacity={0.4}
        top={0}
        left={0}
        right={0}
        bottom={0}
        colors={[category.color, "#00000000", category.color]}
        start={[0, 1]}
        end={[1, 0]}
      />
      <AnimatedView
        w="$full"
        zIndex="$1"
        entering={FadeInDown.springify().mass(0.5).damping(15).stiffness(100)}
        flexDirection="row"
        justifyContent="space-between"
        pt={Platform.OS === "ios" ? insets.top : insets.top + 10}
        ph="$6"
      >
        <Button
          p={0}
          width="$12"
          height="$12"
          br="$full"
          onPress={() => navigation.goBack()}
          animation="fast"
          backgroundColor={`${category.color}23`}
          pressStyle={{
            scale: 0.9,
          }}
          icon={<Icon size={24} icon="chevronLeft" color={category.color} />}
        />
        <Button
          p={0}
          width="$12"
          height="$12"
          br="$full"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
          }}
          animation="fast"
          backgroundColor={`${category.color}23`}
          pressStyle={{
            scale: 0.9,
          }}
          icon={<Icon size={24} icon="heart" color={category.color} />}
        />
      </AnimatedView>
      <HeaderParallaxImage category={category} />
      <AnimatedView
        alignSelf="stretch"
        gap="$2"
        w="$full"
        p="$7"
        entering={FadeInDown.delay(300)
          .springify()
          .mass(0.5)
          .damping(15)
          .stiffness(100)}
      >
        <Text
          textAlign="center"
          fz="$7.5"
          lh="$7.5"
          fw="$3"
          color={category.color}
        >
          {category.name}
        </Text>
        <Text
          textAlign="center"
          fz="$5"
          lh="$5"
          fw="$2"
          opacity={0.5}
          color={category.color}
        >
          {statistics?.find(o => o.category === category.name.toLowerCase()).post_count}{" "}
          постов
        </Text>
      </AnimatedView>
    </GradientBorder>
  );
};

export default CategoryPageHeader;
