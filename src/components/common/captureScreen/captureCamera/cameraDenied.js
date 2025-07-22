import Icon from "@components/ui/icon";
import ShaderShi from "@components/ui/shaderShi";
import { Linking } from "react-native";
import { Button, Text, YStack, View } from "tamagui";
import * as Haptics from "expo-haptics";
import { GradientBorder } from "@components/ui/gradientBorder";

const CaptureCameraDenied = () => {
  const handlePressIn = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    await Linking.openSettings();
  };

  return (
    <YStack f={1}>
      <ShaderShi
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        colors={["#8257DB", "#FF9F0A", "#FF1A1A", "#FF668B"]}
      />
      <YStack
        ph="$6"
        alignItems="center"
        justifyContent="center"
        gap="$6"
        f={1}
      >
        <GradientBorder
          br="$full"
          backgroundColor="$glassButton"
          justifyContent="center"
          alignItems="center"
          w="$23.5"
          h="$23.5"
        >
          <Icon icon="camera" size={88} />
        </GradientBorder>
        <YStack alignItems="center" justifyContent="center" gap="$3">
          <Text textAlign="center" fw="$3" color="$white" fz="$6" lh="$6">
            Нам нужен доступ к камере для записи фото и видео.
          </Text>
          <Text
            textAlign="center"
            fw="$2"
            color="$transparentText"
            fz="$4"
            lh="$4"
          >
            Нажмите Настройки {">"} Разрешения, и разрешите доступ к камере
          </Text>
        </YStack>
      </YStack>
      <View
        position="absolute"
        left={0}
        right={0}
        p="$6"
        bottom={0}
        zIndex="$1"
        pointerEvents="auto"
      >
         <GradientBorder
          br="$full"
          alignItems="center"
          position="relative"
          justifyContent="center"
          w="$full"
          h="$13"
          backgroundColor="$glassButton"
          onPress={handlePressIn}
          pressStyle={{
            scale: 0.98,
            opacity: 0.9,
          }}
          isButton
        >
          <Text fw="$3" fz="$3" lh="$3">
            Настройки
          </Text>
        </GradientBorder>
      </View>
    </YStack>
  );
};

export default CaptureCameraDenied;
