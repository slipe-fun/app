import { View, Text, Image, Button } from "tamagui";
import Icon from "../../../ui/icon";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import Animated, { Easing, FadeInDown, FadeOutUp } from "react-native-reanimated";
import useFetchCategoryPosts from "../../../../hooks/useFetchCategoryPosts";

const AnimatedView = Animated.createAnimatedComponent(View);

const CategoryPageHeader = ({ category, scrollY }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const { posts, setPage } = useFetchCategoryPosts(category?.name?.toLowerCase());

  return (
    <View
      flexDirection="column"
      alignItems="stretch"
      w="$full"
      aspectRatio="1/1"
      justifyContent="space-between"
      borderBottomLeftRadius="$7"
      borderBottomRightRadius="$7"
      backgroundColor={category.color}
    >
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
          backgroundColor={category.secondaryColor}
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
          onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)}}
          animation="fast"
          backgroundColor={category.secondaryColor}
          pressStyle={{
            scale: 0.9,
          }}
          icon={<Icon size={24} icon="heart" color={category.color} />}
        />
      </AnimatedView>
      <AnimatedView
        flex={1}
        alignItems="center"
        justifyContent="center"
        entering={FadeInDown.delay(150).springify().mass(0.5).damping(15).stiffness(100)}
      >
        <Image
          source={category.thumbnail}
          style={{
            width: 280,
            height: 280,
          }}
        />
      </AnimatedView>
      <AnimatedView
        alignSelf="stretch"
        gap="$2"
        w="$full"
        p="$7"
        entering={FadeInDown.delay(300).springify().mass(0.5).damping(15).stiffness(100)}
      >
        <Text
          textAlign="center"
          fz="$7.5"
          lh="$7.5"
          fw="$3"
          color={category.secondaryColor}
        >
          {category.name}
        </Text>
        <Text
          textAlign="center"
          fz="$5"
          lh="$5"
          fw="$2"
          opacity={0.5}
          color={category.secondaryColor}
        >
          30,824,661 Постов
        </Text>
      </AnimatedView>
    </View>
  );
};

export default CategoryPageHeader;
