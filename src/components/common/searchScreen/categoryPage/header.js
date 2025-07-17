import { View, Text, YStack } from "tamagui";
import Icon from "@components/ui/icon";
import { LinearGradient } from "tamagui/linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import useFetchCategoryStatistics from "@hooks/useFetchCategoryStatistics";
import { Blurhash } from "react-native-blurhash";
import FastImage from "react-native-fast-image";
import { fastSpring } from "@constants/easings";

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const CategoryPageHeader = ({ category, scrollY }) => {
  const navigation = useNavigation();
  const { statistics, isLoading, error } = useFetchCategoryStatistics();

  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: withSpring(loaded ? 1 : 0, fastSpring),
    };
  }, [loaded]);

  return (
    <View
      w="$full"
      aspectRatio="4/3"
      borderBottomLeftRadius="$12"
      borderBottomRightRadius="$12"
      justifyContent="flex-end"
      overflow="hidden"
    >
      <>
        <AnimatedFastImage
          resizeMode="cover"
          onLoad={handleLoad}
          source={{
            uri: category?.thumbnail,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={[StyleSheet.absoluteFill, animatedOpacity]}
        />
        {!loaded && category?.blurhash && (
          <Blurhash
            style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
            decodeAsync
            blurhash={category?.blurhash}
          />
        )}
      </>
      <YStack w="$full" p="$6" gap="$4" alignItems="center">
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
        <Text fz="$7" lh="$7" fw="$3" color="$white">
          {category.name}
        </Text>
        <View opacity={0.7} flexDirection="row" alignItems="center" gap="$5">
          <View flexDirection="row" alignItems="center" gap="$2">
            <Icon icon="crown" size={17} />
            <Text fz="$2" lh="$2" fw="$3" color="$white">
              TOP 10
            </Text>
          </View>
          <View br="$7" w="$0.5" h="$0.5" backgroundColor="$white" />
          <View flexDirection="row" alignItems="center" gap="$2">
            <Icon icon="blogs" size={17} />
            <Text fz="$2" lh="$2" fw="$2" color="$white">
              {
                statistics?.find(
                  (o) => o.category === category.name.toLowerCase()
                )?.post_count
              }
            </Text>
          </View>
        </View>
      </YStack>
    </View>
  );
};

export default CategoryPageHeader;
