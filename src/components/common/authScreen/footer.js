import { Button, Text, View } from "tamagui";
import useInsets from "@hooks/ui/useInsets";
import useAuthStore from "@stores/authScreen";
import { useCallback } from "react";

const AuthFooter = () => {
  const insets = useInsets();

  const setFooterHeight = useAuthStore((state) => state.setFooterHeight);

  const handleLayout = useCallback((e) => {
    setFooterHeight(e.nativeEvent.layout.height);
  }, []);

  return (
    <View
      position="absolute"
      bottom={0}
      onLayout={handleLayout}
      left={0}
      right={0}
      pt="$7"
      ph="$7"
      pb={insets.bottom}
    >
      <Button
        h="$13"
        br="$full"
        justifyContent="center"
        alignItems="center"
        backgroundColor="$white"
      >
        <Text fz="$3" lh="$3" fw="$3" color="$black">
          Начать творить
        </Text>
      </Button>
    </View>
  );
};

export default AuthFooter;
