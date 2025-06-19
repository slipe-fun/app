import { Button, View, Image, Text, getVariableValue } from "tamagui";
import Icon from "../../../ui/icon";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { useTheme } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { GradientBorder } from "../../../ui/gradientBorder";

const Category = ({ category }) => {
  const navigation = useNavigation();
  const borderRadius = getVariableValue("$7", "radius");

  return (
    <Button
      unstyled
      flex={1}
      alignItems="stretch"
      aspectRatio="3/4"
      p="$0"
      overflow="hidden"
      br="$7"
      position="relative"
      animation="fast"
      backgroundColor="$transparent"
      pressStyle={{
        scale: 0.98,
        opacity: 0.9,
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        navigation.navigate("Category_Page", { category });
      }}
    >
      <GradientBorder
        borderWidth={1.5}
        style={{
          flex: 1,
        }}
        borderRadius={borderRadius}
        gradientColors={[`${category.color}12`, "#00000000", `${category.color}12`]}
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
        <View alignSelf="stretch" w="$full" alignItems="flex-end" p="$5.5">
          <Icon size={18} icon="arrowUpRight" color={category.color} />
        </View>
        <View flex={1} p="$5" alignItems="center" justifyContent="center">
          <Image
            source={category.thumbnail}
            style={{
              aspectRatio: "1/1",
              height: "120%",
            }}
          />
        </View>
        <View alignSelf="stretch" w="$full" p="$6">
          <Text
            textAlign="center"
            fz="$4"
            lh="$4"
            fw="$3"
            color={category.color}
          >
            {category.name}
          </Text>
        </View>
      </GradientBorder>
    </Button>
  );
};

export default Category;
