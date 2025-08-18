import Animated from "react-native-reanimated";
import { View, Text, Image } from "tamagui";
import { getFadeIn, getFadeOut } from "@constants/fadeAnimations";
import { categories } from "@constants/categories";
import { FlashList } from "@shopify/flash-list";
import useDropdownLogic from "@hooks/ui/useDropdownLogic";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const DropdownMenu = ({ setActiveItem, color }) => {
  const {
    open,
    toggleMenu,
    selectedCategory,
    handleSelectCategory,
    viewAnimatedStyle,
    buttonAnimatedStyle,
    buttonRef
  } = useDropdownLogic(setActiveItem);

  return (
    <AnimatedView
      backgroundColor={color}
      overflow="hidden"
      alignItems="flex-start"
	  exiting={getFadeOut()}
	  entering={getFadeIn()}
      br="$7"
      style={viewAnimatedStyle}
    >
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        br="$7"
        borderWidth={1}
        borderColor="rgba(255,255,255,0.2)"
      />

      <AnimatedView
        onPress={toggleMenu}
        ph="$6"
        alignItems="center"
        h="$12"
        flexDirection="row"
        gap="$5.5"
        ref={buttonRef}
        style={buttonAnimatedStyle}
      >
        <Image
          resizeMethod="resize"
          source={selectedCategory.emoji}
          style={{ width: 24, height: 24 }}
        />
        <Text fz="$2" lh="$2" fw="$3" color="$white">
          {selectedCategory.name}
        </Text>
      </AnimatedView>

      {open && (
        <AnimatedFlashList
          height={categories.slice(1, 7).length * 43}
          initialNumToRender={7}
          removeClippedSubviews
          style={{ width: "100%" }}
          maxToRenderPerBatch={6}
          data={categories.slice(1)}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <View
              pt="$4.5"
              pb={index === categories.length - 2 ? "$6" : "$4.5"}
              ph="$6"
              alignItems="center"
              flexDirection="row"
              gap="$5.5"
              onPress={() => handleSelectCategory(item)}
            >
              <Image
                resizeMethod="resize"
                source={item.emoji}
                style={{ width: 24, height: 24 }}
              />
              <Text fz="$2" lh="$2" fw="$2" color="$white">
                {item.name}
              </Text>
            </View>
          )}
          entering={getFadeIn()}
          exiting={getFadeOut()}
        />
      )}
    </AnimatedView>
  );
};

export default DropdownMenu;
