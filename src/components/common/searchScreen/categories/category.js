import Animated, { FadeInDown, Easing } from 'react-native-reanimated';
import { Button, View, Image, Text } from 'tamagui';
import Icon from '../../../ui/icon';

const Category = ({ category, colIndex, rowIndex }) => {
  const delay = (colIndex + rowIndex) * 100;

  return (
    <Animated.View flex={category.flex} entering={FadeInDown.delay(delay).duration(400).easing(Easing.inOut(Easing.ease))}>
      <Button
        unstyled
        flex={1}
        flexDirection="column"
        alignItems="stretch"
        justifyContent="space-between"
        p="$0"
        br="$4"
        animation="fast"
        backgroundColor={category.color}
        pressStyle={{
          scale: 0.98,
          opacity: 0.9,
        }}
      >
        <View alignSelf="stretch" w="$full" alignItems="flex-end" p="$5">
          <Icon size={18} icon="arrowUpRight" color={category.secondaryColor} />
        </View>
        <View flex={1} alignItems="center" justifyContent="center">
          <Image
            source={category.thumbnail}
            w={category.thumbnailSize}
            h={category.thumbnailSize}
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
    </Animated.View>
  );
};

export default Category;
