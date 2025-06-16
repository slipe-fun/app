import { Button, View, Image, Text } from "tamagui";
import Icon from "../../../ui/icon";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

const Category = ({ category }) => {
  const navigation = useNavigation()

  return (
    <Button
      unstyled
      flex={category.flex}
      flexDirection="column"
      alignItems="stretch"
      justifyContent="space-between"
      p="$0"
      br="$7"
      animation="fast"
      backgroundColor={category.color}
      pressStyle={{
        scale: 0.98,
        opacity: 0.9,
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        navigation.navigate('Category_Page', { category })
      }}
    >
      <View alignSelf="stretch" w="$full" alignItems="flex-end" p="$5.5">
        <Icon size={18} icon="arrowUpRight" color={category.secondaryColor} />
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
          color={category.secondaryColor}
        >
          {category.name}
        </Text>
      </View>
    </Button>
  );
};

export default Category;
