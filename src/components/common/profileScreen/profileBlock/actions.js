import { Button, XStack, useTheme, Text } from "tamagui";
import { GradientBorder } from "@components/ui/gradientBorder";
import Icon from "@components/ui/icon";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "@constants/routes";
import { useTranslation } from "react-i18next";
import { api } from "@lib/api";
import { toast } from "sonner-native";

const ProfileActions = ({ isScreen, user }) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const theme = useTheme();
    const color = theme.color.get();

    async function follow() {
        const startUser = user;
        try {
            const isFollowed = !user?.isFollowed;
            user?.setUser({ ...user, followers: isFollowed ? user?.followers + 1 : user?.followers - 1, isFollowed });

            await api.v1.post("/account/subscribe", JSON.stringify({ user_id: user?.id }));
        } catch {
            toast.error("Failed to follow");
            user?.setUser(startUser);
        }
    }

    return (
        <XStack gap="$6" w='$full'>
            <Button onPress={isScreen ? follow : null} backgroundColor={`$${user?.isFollowed ? "backgroundTransparent" : "primary"}`} unstyle d br="$full" ph="$7.5" h="$13" justifyContent="center" alignItems="center">
                <Text fz="$3" lh="$3" fw="$3">{isScreen ? t(`profile.${user?.isFollowed ? "unfollow" : "follow"}`) : t('profile.edit')}</Text>
            </Button>
            <GradientBorder pressStyle={{ scale: 0.98, opacity: 0.9 }} onPress={() => !isScreen && navigation.navigate(ROUTES.NOTIFS)} backgroundColor="$backgroundTransparent" isButton w="$13" h="$13" br="$full" justifyContent="center" alignItems="center">
                <Icon icon={isScreen ? "flag" : "bell"} size={26} color={color} />
            </GradientBorder>
            {!isScreen && (
                <GradientBorder pressStyle={{ scale: 0.98, opacity: 0.9 }} onPress={() => navigation.navigate(ROUTES.SETTINGS)} backgroundColor="$backgroundTransparent" isButton w="$13" h="$13" br="$full" justifyContent="center" alignItems="center">
                    <Icon icon="gear" size={26} color={color} />
                </GradientBorder>
            )}
        </XStack>
    )
}

export default ProfileActions   