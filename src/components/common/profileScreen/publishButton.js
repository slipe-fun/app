import { useState, useEffect, useCallback, memo } from "react";
import { View, Image, Button, Text } from "tamagui";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAverageColor } from "@somesoap/react-native-image-palette";
import Icon from "@components/ui/icon";
import useGetAlbumPhotos from "@hooks/ui/useGetAlbumPhotos";
import toSafeFileUri from "@lib/toSafeFileUrl";
import ColorfullyView from "@components/ui/colorfullyView";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@constants/routes";

const PublishButton = () => {
	const photos = useGetAlbumPhotos(1);
	const navigation = useNavigation();
	const [color, setColor] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
		getAverageColor(toSafeFileUri(photos[0]?.uri), {
			pixelSpacingAndroid: 7,
		}).then(setColor);
	}, [photos]);

	const handlePress = useCallback(() => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
		navigation.navigate(ROUTES.PUBLISH);
	}, []);

	return (
		<Button
			unstyled
			m='$3'
			w='$full'
			br='$7'
			backgroundColor='$transparent'
			overflow='hidden'
			pressStyle={{
				scale: 0.98,
				opacity: 0.9,
			}}
			onPress={handlePress}
		>
			<View aspectRatio='6/9' style={StyleSheet.absoluteFill} />
			<View w='$full' aspectRatio='6/9' position='relative' overflow='hidden'>
				<Image source={{ uri: photos[0]?.uri }} position='absolute' top={0} left={0} right={0} bottom={0} objectFit='scale-down' />
				<View f={1} justifyContent='center' alignItems='center'>
					<ColorfullyView br='$full' w='$19' h='$19' justifyContent='center' alignItems='center' color={color}>
						<Icon icon='plus' size={44} color='white' />
					</ColorfullyView>
				</View>
				<View position='absolute' p='$6.5' alignItems='center' pb='$6.5' left={0} right={0} bottom={0}>
					<Text zIndex='$1' fz='$4' lh='$4' fw='$3' color='$white'>
						{t("profile.publishButton")}
					</Text>
					<LinearGradient
						colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
						start={{ x: 0.5, y: 0 }}
						end={{ x: 0.5, y: 1 }}
						style={StyleSheet.absoluteFill}
					/>
				</View>
			</View>
		</Button>
	);
};

export default memo(PublishButton);
