import { Image, Separator, Text, View, XStack, YStack, useTheme } from "tamagui";
import Icon from "@components/ui/icon";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import Toggle from "@components/ui/toggle";

const SettingRow = ({ title, onPress, icon, value, label, color, separator, type = "link", image = false, translate = true }) => {
	const theme = useTheme();
	const { t } = useTranslation();

	const iconColor = theme.secondaryText.get();

	const renderAction = useCallback(() => {
		switch (type) {
			case "link":
				return (
					<View alignItems='center' justifyContent='center' w='$10' h='$10'>
						<Icon size={22} color={iconColor} icon='chevron.right' />
					</View>
				);
			case "toggle":
				return (
					<Toggle initial={value} />
				);
			case "checkbox":
				return (
					<View alignItems='center' justifyContent='center' w='$10' h='$10'>
						<Icon size={22} color={iconColor} icon='chevron.right' />
					</View>
				);
			default:
				return null;
		}
	}, [type]);

	return (
			<XStack onPress={() => onPress()} alignItems='center'>
				{icon && (
					<View alignItems='center' justifyContent='center' m='$5.5' mr='$0' br='$1' backgroundColor={`$${color}`} w='$10' h='$10'>
						{image ? (
							<Image w="$7" h="$7" source={image} />
						) : (
							<Icon size={22} icon={icon} />
						)}
					</View>
				)}
				<YStack f={1} p='$5.5' pr='$0' pb='$0'>
					<XStack alignItems='center' pb='$5.5' f={1} pr='$5.5'>
						<Text f={1} fz='$3' fw='$3' lh='$3' numberOfLines={1} textOverflow='ellipsis'>
							{translate ? t(`settings.${title}`) : title}
						</Text>
						{renderAction()}
					</XStack>
					{separator && <Separator borderWidth={0.5} backgroundColor='$separator' borderColor='$separator' w='$full' />}
				</YStack>
			</XStack>
	);
};

export default SettingRow;
