import { Button, Image, Text, XStack, View } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

const SearchSliderSlide = () => {
  return (
    <View justifyContent="flex-end" f={1}>
      <Image
        source={require("@assets/test/bg-example.png")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        objectFit="cover"
      />
      <XStack
        alignItems="center"
        w="$full"
        position="relative"
        p="$6.5"
        gap="$6"
      >
        <Text
          overflow="hidden"
          fw="$3"
          lh="$4"
          f={1}
          fz="$4"
          zIndex="$1"
          textOverflow="ellipsis"
          numberOfLines={2}
        >
          Топ 10 постов для подходящих для вас
        </Text>
        <Button
          h="$12"
          unstyled
          br="$full"
          zIndex="$1"
          justifyContent="center"
          ph="$7"
          backgroundColor="$white"
        >
          <Text fz="$2" lh="$2" fw="$3" color="$black">
            Открыть
          </Text>
        </Button>
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </XStack>
    </View>
  );
};

export default SearchSliderSlide;
