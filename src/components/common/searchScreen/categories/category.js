import { Button, View, Image, Text } from "tamagui";
import Icon from "../../../ui/icon";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { useTheme } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { GradientBorder } from "../../../ui/gradientBorder";

const Category = ({ category }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const color = theme.bg.get();

  return (
    <GradientBorder>
      <Button
        unstyled
        flex={category.flex}
        flexDirection="column"
        alignItems="stretch"
        justifyContent="space-between"
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
        <LinearGradient
          alignSelf="stretch"
          flex={1}
          position="absolute"
          opacity={0.4}
          top={0}
          left={0}
          right={0}
          bottom={0}
          colors={[category.color, color, category.color]}
          start={[0, 1]}
          end={[1, 0]}
        />
        <View alignSelf="stretch" w="$full" alignItems="flex-end" p="$5.5">
          <Icon size={18} icon="arrowUpRight" color={category.color} />
        </View>
        <View flex={1} alignItems="center" justifyContent="center">
          <Image
            source={category.thumbnail}
            style={{
              width: category.thumbnailSize,
              height: category.thumbnailSize,
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
      </Button>
    </GradientBorder>
  );
};

export default Category;
