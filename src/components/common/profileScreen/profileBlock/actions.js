import { Button, XStack, useTheme, Text  } from "tamagui";
import { GradientBorder } from "@components/ui/gradientBorder";
import Icon from "@components/ui/icon";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "@constants/routes";
import { useTranslation } from "react-i18next";

const ProfileActions = () => {
    const navigation = useNavigation();
    const {t} = useTranslation();
    const theme = useTheme();
    const color = theme.color.get();

    return (
        <XStack gap="$6" w='$full'>
            <Button unstyle d br="$full" ph="$7.5" h="$13" justifyContent="center" alignItems="center">
                <Text fz="$3" lh="$3" fw="$3">{t('profile.edit')}</Text>
            </Button>
            <GradientBorder pressStyle={{ scale: 0.98, opacity: 0.9 }} onPress={() => navigation.navigate(ROUTES.NOTIFS)} backgroundColor="$backgroundTransparent" isButton w="$13" h="$13" br="$full" justifyContent="center" alignItems="center">
                <Icon icon="bell" size={26} color={color} />
            </GradientBorder>
            <GradientBorder pressStyle={{ scale: 0.98, opacity: 0.9 }} onPress={() => navigation.navigate(ROUTES.SETTINGS)} backgroundColor="$backgroundTransparent" isButton w="$13" h="$13" br="$full" justifyContent="center" alignItems="center">
                <Icon icon="gear" size={26} color={color} />
            </GradientBorder>
        </XStack>
    )
}

export default ProfileActions   