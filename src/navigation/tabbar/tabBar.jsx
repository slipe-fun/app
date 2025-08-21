import useInsets from "@hooks/ui/useInsets";
import TabBarItem from "./tabBar.item";
import { XStack } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";

export default function TabBar({ state, navigation }) {
  const insets = useInsets();

  return (
    <XStack
      pb={insets.bottom}
      pt="$6"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      flexDirection="row"
      alignItems="center"
    >
        <LinearGradient
            colors={["#00000000", "#000000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.85 }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        />
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabBarItem
            key={route.key}
            route={route}
            isFocused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </XStack>
  );
}
