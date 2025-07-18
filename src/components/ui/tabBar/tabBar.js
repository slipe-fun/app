import useInsets from "@hooks/ui/useInsets";
import TabBarItem from "./tabBarItem";
import { View } from "tamagui";

const CustomTabBar = ({ state, navigation }) => {
  const insets = useInsets();

  return (
    <View
      backgroundColor="$bg"
      pb={insets.bottom}
      pt={8}
      flexDirection="row"
      alignItems="center"
    >
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
    </View>
  );
};

export default CustomTabBar;
