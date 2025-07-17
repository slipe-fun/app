import { Button, View, Text, Image } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Blurhash } from "react-native-blurhash";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

const Category = ({ category }) => {
  const navigation = useNavigation();

  return (
    <Button
      unstyled
      w="$full"
      aspectRatio="4/3"
      alignItems="stretch"
      p="$0"
      overflow="hidden"
      br="$7"
      justifyContent="flex-end"
      position="relative"
      pressStyle={{
        scale: 0.98,
        opacity: 0.9,
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        navigation.navigate("Category_Page", { category });
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
      <FastImage
        source={{
          uri: category.thumbnail,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={
          <LinearGradient
            colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
            start={{ x: 0.5, y: 0.8 }}
            end={{ x: 0.5, y: 0 }}
            style={{ flex: 1 }}
          />
        }
      >
        <Blurhash
          style={{ flex: 1 }}
          decodeAsync
          blurhash={category.blurhash}
        />
      </MaskedView>
      <View alignSelf="stretch" w="$full" p="$6.5">
        <Text textAlign="start" fz="$4" lh="$4" fw="$3" color={category.color}>
          {category.name}
        </Text>
      </View>
    </Button>
  );
};

export default memo(Category);
