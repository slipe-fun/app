import { Button, View, Text } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import MediaPreview from "@components/ui/mediaPreview";
import { useTranslation } from "react-i18next";

const Category = ({ category }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <Button
      unstyled
      w="$full"
      aspectRatio="5/4"
      alignItems="stretch"
      p="$0"
      overflow="hidden"
      br="$7"
      backgroundColor="$transparent"
      justifyContent="flex-end"
      position="relative"
      pressStyle={{
        scale: 0.98,
        opacity: 0.9,
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        navigation.navigate("category_Page", { category });
      }}
    >
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        br="$7"
        borderWidth={1}
        borderColor="rgba(255,255,255,0.1)"
        zIndex="$2"
        pointerEvents="none"
      />

      <MediaPreview type="category" blurhash={category.blurhash} media={category.thumbnail}/>
     
      <View alignSelf="stretch" w="$full" p="$6.5">
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
        <Text textAlign="start" fz="$4" lh="$4" fw="$3" color={category.color}>
          {t(`categories.${category.name}`)}
        </Text>
      </View>
    </Button>
  );
};

export default memo(Category);
