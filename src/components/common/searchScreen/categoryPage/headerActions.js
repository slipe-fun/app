import { XStack, useTheme } from "tamagui";
import Icon from "@components/ui/icon";
import { useNavigation } from "@react-navigation/native";
import useInsets from "@hooks/ui/useInsets";
import { GradientBorder } from "@components/ui/gradientBorder";

const CategoryPageHeaderActions = ({ isSlides }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useInsets();

  const color = theme.color.get();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <XStack
      zIndex="$2"
      position="absolute"
      top={0}
      left={0}
      right={0}
      alignItems="center"
      justifyContent={isSlides ? "flex-start" : "space-between"}
      p="$6"
      w="$full"
      pt={insets.top}
    >
      <GradientBorder
        isButton
        w="$13"
        onPress={handleBack}
        h="$13"
        br="$full"
        backgroundColor="$glassButton"
        justifyContent="center"
        alignItems="center"
        pressStyle={{
          scale: 0.98,
          opacity: 0.9,
        }}
      >
        <Icon icon="chevron.left" size={26} color={color} />
      </GradientBorder>
      {!isSlides && (
        <GradientBorder
          isButton
          w="$13"
          h="$13"
          backgroundColor="$glassButton"
          br="$full"
          justifyContent="center"
          alignItems="center"
          pressStyle={{
            scale: 0.98,
            opacity: 0.9,
          }}
        >
          <Icon icon="heart" size={26} color={color} />
        </GradientBorder>
      )}
    </XStack>
  );
};

export default CategoryPageHeaderActions;
