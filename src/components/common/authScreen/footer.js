import { Button, Text, XStack } from "tamagui";
import useInsets from "@hooks/ui/useInsets";
import useAuthStore from "@stores/authScreen";
import { useCallback } from "react";
import { ROUTES } from "@constants/routes";
import { useTranslation } from "react-i18next";
import Icon from "@components/ui/icon";

const routes = [
  ROUTES.AUTH_WELCOME,
  ROUTES.AUTH_USERNAME,
  ROUTES.AUTH_PASSWORD,
  ROUTES.AUTH_AVATAR,
  ROUTES.AUTH_FINISH,
];

const AuthFooter = ({ nextRoute, active, welcome, navigation, callback = async () => true}) => {
  const insets = useInsets();
  const { t } = useTranslation();
  const setFooterHeight = useAuthStore((state) => state.setFooterHeight);

  const handleLayout = useCallback(
    (e) => {
      setFooterHeight(e.nativeEvent.layout.height);
    },
    [setFooterHeight]
  );

  const handlePress = async () => {
    if (!await callback?.()) return;
    navigation.navigate(nextRoute >= 5 ? "MainApp" : routes[nextRoute]);
  };

  return (
    <XStack
      position="absolute"
      bottom={0}
      onLayout={handleLayout}
      left={0}
      right={0}
      pt="$7"
      ph="$7"
      gap="$7"
      pb={insets.bottom}
    >
      {!welcome && nextRoute !== 5 && (
        <Button onPress={() => navigation.goBack()} h="$13" w="$13" br="$full" alignItems="center" justifyContent="center" backgroundColor="$backgroundTransparent" unstyled >
          <Icon icon="chevron.left" />
        </Button>
      )}
      <Button
        h="$13"
        f={1}
        backgroundColor={welcome ? "$white" : "$primary"}
        opacity={active ? 1 : 0.5}
        pointerEvents={active ? "auto" : "none"}
        br="$full"
        key="footer-button"
        onPress={handlePress}
        justifyContent="center"
        alignItems="center"
      >
        <Text color={welcome ? "$black" : "$white"} fz="$3" lh="$3" fw="$3">
          {welcome ? t("auth.footer_button") : t("auth.footer_button_next")}
        </Text>
      </Button>
    </XStack>
  );
};
export default AuthFooter;
