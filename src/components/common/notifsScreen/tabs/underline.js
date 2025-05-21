import { forwardRef } from "react";
import { Button, ScrollView } from "tamagui";
import { Text, View } from "tamagui";
import { useState } from "react";

const UnderLineTabs = forwardRef(({ tabs, selectedIndex, onSelect }, ref) => {
  const [layouts, setLayouts] = useState([]);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ alignItems: "center", paddingHorizontal: "$6" }}
      overScrollMode="never"
      showsHorizontalScrollIndicator={false}
    >
      <View flexDirection="row" gap="$3" ref={ref}>
        {tabs.map((tab, index) => {
          const isFocused = selectedIndex === index;
          return (
            <Button
              key={tab.key}
              backgroundColor="transparent"
              pt="$4"
              height="auto"
              pb="$5"
              ph="$6"
              justifyContent="center"
              alignItems="center"
              onPress={() => onSelect(index)}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                setLayouts((prev) => {
                  const newLayouts = [...prev];
                  newLayouts[index] = { x, width };
                  return newLayouts;
                });
              }}
            >
              <Text fz="$2" fw="$3" opacity={isFocused ? 1 : 0.75} color={isFocused ? "$primary" : "$color"} animation="quick">{tab.label}</Text>
            </Button>
          );
        })}
        <View
          position="absolute"
          bottom={0}
          borderTopLeftRadius="$3"
          borderTopRightRadius="$3"
          left={layouts[selectedIndex]?.x ?? 0}
          width={layouts[selectedIndex]?.width ?? 0}
          borderWidth={1.25}
          borderColor="$primary"
          animation="quick"
        />
      </View>
    </ScrollView>
  );
});

export default UnderLineTabs;
