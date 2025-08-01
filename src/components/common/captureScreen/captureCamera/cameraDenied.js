import Icon from "@components/ui/icon";
import { Linking } from "react-native";
import { Text, YStack, View, Button } from "tamagui";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";

const CaptureCameraDenied = () => {
  const { t } = useTranslation();
  const handlePressIn = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    await Linking.openSettings();
  };

  return (
    <YStack backgroundColor="$backgroundTransparent" f={1}>
      <YStack
        ph="$6"
        alignItems="center"
        justifyContent="center"
        gap="$6"
        f={1}
      >
        <View
          br="$full"
          backgroundColor="$innerBlock"
          justifyContent="center"
          alignItems="center"
          w="$23.5"
          h="$23.5"
        >
          <Icon icon="camera" size={88} />
        </View>
        <YStack alignItems="center" justifyContent="center" gap="$4">
          <Text textAlign="center" fw="$3" color="$color" fz="$6" lh="$6">
            {t('publish.accessTitle')}
          </Text>
          <Text
            textAlign="center"
            fw="$2"
            color="$secondaryText"
            fz="$2"
            lh="$2"
          >
            {t('publish.accessSubtitle')}
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
         <Button
          br="$full"
          alignItems="center"
          position="relative"
          justifyContent="center"
          w="$full"
          unstyled
          h="$13"
          backgroundColor="$innerBlock"
          onPress={handlePressIn}
          pressStyle={{
            scale: 0.98,
            opacity: 0.9
          }}
        >
          <Text fw="$3" fz="$3" lh="$3">
            {t('publish.accessSettings')}
          </Text>
        </Button>
      </View>
    </YStack>
  );
};

export default CaptureCameraDenied;
