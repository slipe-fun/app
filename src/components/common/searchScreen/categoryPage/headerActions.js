import { XStack } from "tamagui";
import Icon from "@components/ui/icon";
import { useNavigation } from "@react-navigation/native";
import useInsets from "@hooks/ui/useInsets";
import useBlurhashColor from "@hooks/ui/useBlurhashColor";
import ColorfullyView from "@components/ui/colorfullyView";

const CategoryPageHeaderActions = ({ blurhash, isSlides }) => {
  const navigation = useNavigation();
  const insets = useInsets();
  const color = useBlurhashColor({ blurhash });

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <XStack
      zIndex="$1"
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
      <ColorfullyView
        unstyled
        isButton
        w="$12"
        onPress={handleBack}
        h="$12"
        color={color}
        br="$full"
        justifyContent="center"
        alignItems="center"
        pressStyle={{
          scale: 0.98,
          opacity: 0.9,
        }}
      >
        <Icon icon="chevronLeft" size={24} />
      </ColorfullyView>
      {!isSlides && (
      <ColorfullyView
        unstyled
        isButton
        w="$12"
        h="$12"
        color={color}
        br="$full"
        justifyContent="center"
        alignItems="center"
        pressStyle={{
          scale: 0.98,
          opacity: 0.9,
        }}
      >
        <Icon icon="heart" size={24} />
      </ColorfullyView>
      )}
    </XStack>
  );
};

export default CategoryPageHeaderActions;
