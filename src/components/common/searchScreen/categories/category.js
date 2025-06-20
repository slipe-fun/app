import { Button, View, Text, getVariableValue, Image } from "tamagui";
import Icon from "../../../ui/icon";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { GradientBorder } from "../../../ui/gradientBorder";
import { Canvas, Rect, LinearGradient as SkiaLinearGradient, vec } from "@shopify/react-native-skia";
import { useState, useCallback, memo } from "react";

const Category = ({ category }) => {
  const navigation = useNavigation();
  const borderRadius = getVariableValue("$7", "radius");

  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const onLayout = useCallback((e) => {
    const { width, height } = e.nativeEvent.layout;
    setLayout({ width, height });
  }, []);

  const startVec = vec(0, layout.height);
  const endVec = vec(layout.width, 0);

  return (
    <Button
      unstyled
      flex={1}
      alignItems="stretch"
      p="$0"
      overflow="hidden"
      br="$7"
      position="relative"
      animation="fast"
      backgroundColor="$transparent"
      pressStyle={{
        scale: 0.98,
        opacity: 0.9,
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        navigation.navigate("Category_Page", { category });
      }}
    >
      <GradientBorder
        borderWidth={1.5}
        borderRadius={borderRadius}
        gradientColors={[`${category.color}12`, `${category.color}00`, `${category.color}12`]}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.4,
          }}
          onLayout={onLayout}
        >
          {layout.width > 0 && layout.height > 0 && (
            <Canvas style={{ flex: 1 }}>
              <Rect x={0} y={0} width={layout.width} height={layout.height}>
                <SkiaLinearGradient
                  start={startVec}
                  end={endVec}
                  colors={[category.color, "#00000000", category.color]}
                />
              </Rect>
            </Canvas>
          )}
        </View>

        <View alignSelf="stretch" w="$full" alignItems="flex-end" p="$5.5">
          <Icon size={18} icon="arrowUpRight" color={category.color} />
        </View>
        <View w="$full" p="$1" aspectRatio="9/7" alignItems="center" justifyContent="center">
          <Image 
            source={category.thumbnail}
            style={{
              aspectRatio: "1/1",
              height: "100%",
            }}
          />
        </View>
        <View alignSelf="stretch" w="$full" p="$6">
          <Text
            textAlign="center"
            fz="$4"
            lh="$4"
            fw="$3"
            color={category.color}
          >
            {category.name}
          </Text>
        </View>
      </GradientBorder>
    </Button>
  );
};

export default memo(Category);
