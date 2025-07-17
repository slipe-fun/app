import { View, Text, Image, Button, getVariableValue } from "tamagui";
import Icon from "@components/ui/icon";
import { Platform } from "react-native";
import { LinearGradient } from "tamagui/linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GradientBorder } from "@components/ui/gradientBorder";
import useFetchCategoryStatistics from "@hooks/useFetchCategoryStatistics";

const AnimatedView = Animated.createAnimatedComponent(View);

const CategoryPageHeader = ({ category, scrollY }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const borderRadius = getVariableValue("$7", "radius");
  const { statistics, isLoading, error } = useFetchCategoryStatistics();

  return (
    <View>
      <View>
        <Button onPress={() => navigation.goBack()}>
          <Icon icon="chevronLeft" /> 
        </Button>
        <Text>{category.name}</Text>
      </View>
      <Image source={category.thumbnail} style={{ height: "120%", aspectRatio: "1/1" }} />
    </View>
  );
};

export default CategoryPageHeader;
