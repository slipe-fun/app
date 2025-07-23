import { Button, XStack, useTheme, Text  } from "tamagui";
import { GradientBorder } from "@components/ui/gradientBorder";
import Icon from "@components/ui/icon";

const ProfileActions = () => {
    const theme = useTheme();
    const color = theme.color.get();

    return (
        <XStack gap="$6" w='$full'>
            <Button unstyle d br="$full" ph="$7.5" h="$13" justifyContent="center" alignItems="center">
                <Text fz="$3" lh="$3" fw="$3">Редактировать</Text>
            </Button>
            <GradientBorder backgroundColor="$backgroundTransparent" isButton w="$13" h="$13" br="$full" justifyContent="center" alignItems="center">
                <Icon icon="notifications" size={26} color={color} />
            </GradientBorder>
            <GradientBorder backgroundColor="$backgroundTransparent" isButton w="$13" h="$13" br="$full" justifyContent="center" alignItems="center">
                <Icon icon="gear" size={26} color={color} />
            </GradientBorder>
        </XStack>
    )
}

export default ProfileActions   